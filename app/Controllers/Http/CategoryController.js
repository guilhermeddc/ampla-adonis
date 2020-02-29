'use strict'

const Category = use('App/Models/Category')

class CategoryController {
  async index ({ response }) {
    try {
      const categories = await Category.all()
      return categories
    } catch (error) {
      response.status(400).send({ status: 400, message: error.message })
    }
  }

  async store ({ request, response }) {
    try {
      const data = request.only(['name'])
      const categories = await Category.create(data)

      return categories
    } catch (error) {
      response.status(400).send({ status: 400, message: error.message })
    }
  }

  async show ({ params, request, response, view }) {
    try {
      const categories = await Category.findOrFail(params.id)
      return categories
    } catch (error) {
      response.status(400).send({ status: 400, message: error.message })
    }
  }

  async update ({ params, request, response }) {
    try {
      const categories = await Category.findOrFail(params.id)
      const data = request.only(['name'])

      categories.merge(data)
      await categories.save()

      return categories;
    } catch (error) {
      response.status(400).send({ status: 400, message: error.message })
    }
  }

  async destroy ({ params, request, response }) {
    try {
      const categories = await Category.findOrFail(params.id)
      return categories.delete()
    } catch (error) {
      response.status(400).send({ status: 400, message: error.message })
    }
  }
}

module.exports = CategoryController
