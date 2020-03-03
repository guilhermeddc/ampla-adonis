'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Post = use('App/Models/Post')
const Transformer = use('App/Transformers/Blog/PostTransformer')
/**
 * Resourceful controller for interacting with posts
 */
class PostController {
  /**
   * Show a list of all posts.
   * GET posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ transform, request, response, pagination }) {
    try {
      const title = request.input('title')
      const query = Post.query()
      if (title) {
        query.where('title', 'LIKE', `%${title}%`)
      }

      const posts = await query.paginate(pagination.page, pagination.limit)
      const trasformPost = await transform.paginate(posts, Transformer)
      return response.send(trasformPost)
    } catch (error) {
      return response.status(400).send({ message: 'Erro ao processar a sua solicitação!' })
    }
  }

  /**
   * Create/save a new post.
   * POST posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ transform, request, response }) {
    try {
      const { title, description, author, image_id } = request.all()
      const post = await Post.create({ title, description, author, image_id })
      const trasformPost = await transform.paginate(post, Transformer)
      return response.status(201).send(trasformPost)
    } catch (error) {
      return response.status(400).send({ message: 'Erro ao processar a sua solicitação!' })
    }
  }

  /**
   * Display a single post.
   * GET posts/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async show ({ params: { id }, transform, response }) {
    try {
      const post = await Post.findOrFail(id)
      const trasformPost = await transform.paginate(post, Transformer)
      return response.send(trasformPost)
    } catch (error) {
      return response.status(400).send({ message: 'Erro ao processar a sua solicitação!' })
    }
  }

  /**
   * Update post details.
   * PUT or PATCH posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params: { id }, transform, request, response }) {
    try {
      const post = await Post.findOrFail(id)
      const { title, description, author, image_id } = request.all()
      post.merge({ title, description, author, image_id })
      await post.save()
      const trasformPost = await transform.paginate(post, Transformer)
      return response.status(200).send(trasformPost)
    } catch (error) {
      return response.status(400).send({ message: 'Erro ao processar a sua solicitação!' })
    }
  }

  /**
   * Delete a post with id.
   * DELETE posts/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy ({ params: { id }, response }) {
    try {
      const post = await Post.findOrFail(id)
      await post.delete()
      return response.status(204).send()
    } catch (error) {
      return response.status(400).send({ message: 'Erro ao processar a sua solicitação!' })
    }
  }
}

module.exports = PostController
