'use strict'

const Post = use('App/Models/Post')

class PostController {
  async index ({ response }) {
    try {
      const posts = await Post.query().with('user').fetch()
      return posts
    } catch (error) {
      response.status(400).send({ status: 400, message: error.message })
    }
  }

  async store ({ request, response, auth }) {
    try {
      const data = request.only(['title', 'description', 'image'])
      const posts = await Post.create({ ...data, author: auth.user.id })
      return posts
    } catch (error) {
      response.status(400).send({ status: 400, message: error.message })
    }
  }

  async show ({ params, response }) {
    try {
      const posts = await Post.findOrFail(params.id)
      await posts.load('user')
      await posts.load('file')
      return posts
    } catch (error) {
      response.status(400).send({ status: 400, message: error.message })
    }
  }

  async update ({ params, request, response }) {
    try {

    } catch (error) {
      response.status(400).send({ status: 400, message: error.message })
    }
  }

  async destroy ({ params, request, response }) {
    try {

    } catch (error) {
      response.status(400).send({ status: 400, message: error.message })
    }
  }
}

module.exports = PostController
