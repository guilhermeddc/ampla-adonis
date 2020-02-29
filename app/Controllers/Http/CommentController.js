'use strict'

const Commment = use('App/Models/Comment')

class CommentController {
  async index ({ response }) {
    try {
      const comments = await Commment.all()
      return comments
    } catch (error) {
      response.status(400).send({ status: 400, message: error.message })
    }
  }

  async store ({ request, response }) {
    try {
      const data = request.only([
        'author',
        'comments',
        'post'
      ])
      const comments = await Commment.create(data)
      return comments
    } catch (error) {
      response.status(400).send({ status: 400, message: error.message })
    }
  }
}

module.exports = CommentController
