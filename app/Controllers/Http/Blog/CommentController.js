'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Comment = use('App/Models/Comment')
/**
 * Resourceful controller for interacting with comments
 */
class CommentController {
  /**
   * Show a list of all comments.
   * GET comments
   *
   * @param {object} ctx
   * @param {params} ctx.params
   * @param {Response} ctx.response
   */
  async index ({ params, response }) {
    try {
      const comments = await Comment.query()
        .where('post_id', params.posts_id)
        .fetch()
      return response.send(comments)
    } catch (error) {
      return response.status(400).send({ message: error.message })
    }
  }

  /**
   * Create/save a new comment.
   * POST comments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ params, request, response }) {
    try {
      const data = request.only(['name', 'commentary'])
      const comment = await Comment.create({ ...data, post_id: params.posts_id })
      return response.status(201).send(comment)
    } catch (error) {
      return response.status(400).send({ message: error.message })
    }
  }

  /**
   * Update comment details.
   * PUT or PATCH comments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params: { id }, request, response }) {
    try {
      const comment = await Comment.findOrFail(id)
      const { accepted } = request.all()
      comment.merge({ accepted })
      await comment.save()
      return response.status(200).send(comment)
    } catch (error) {
      return response.status(400).send({ message: 'Erro ao processar a sua solicitação!' })
    }
  }

  /**
   * Delete a comment with id.
   * DELETE comments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params: { id }, response }) {
    try {
      const comment = await Comment.findOrFail(id)
      await comment.delete()
      return response.status(204).send()
    } catch (error) {
      return response.status(400).send({ message: 'Erro ao processar a sua solicitação!' })
    }
  }
}

module.exports = CommentController
