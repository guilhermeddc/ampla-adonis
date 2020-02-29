'use strict'

const Product = use('App/Models/Product')
const tableColumns = [
  'name',
  'price',
  'description',
  'category',
  'provider',
  'photo01',
  'photo02',
  'photo03',
  'photo04'
]

class ProductController {
  async index ({ response }) {
    try {
      const products = await Product.all()
      return products
    } catch (error) {
      response.status(400).send({ status: 400, message: error.message })
    }
  }

  async store ({ request, response, auth }) {
    try {
      const data = request.only(tableColumns)
      const products = await Product.create(data)
      return products
    } catch (error) {
      response.status(400).send({ status: 400, message: error.message })
    }
  }

  async show ({ params, response }) {
    try {
      const products = await Product.findOrFail(params.id)
      return products
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

module.exports = ProductController
