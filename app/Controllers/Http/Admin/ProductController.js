'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Product = use('App/Models/Product')
const Transformer = use('App/Transformers/Admin/ProductTransformer')
/**
 * Resourceful controller for interacting with products
 */
class ProductController {
  /**
   * Show a list of all products.
   * GET products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {object} ctx.pagination
   */
  async index ({ transform, request, response, pagination }) {
    try {
      const name = request.input('name')
      const query = Product.query()
      if (name) {
        query.where('name', 'ILIKE', `%${name}%`)
      }

      const products = await query.paginate(pagination.page, pagination.limit)
      const trasformProduct = await transform.paginate(products, Transformer)
      console.log(trasformProduct);
      console.log();
      console.log(product);
      return response.send(trasformProduct)
    } catch (error) {
      console.log(error);

      return response.status(400).send({ status: 400, message: error.message })
    }
  }

  /**
   * Create/save a new product.
   * POST products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, transform }) {
    try {
      const {
        name, description, price, image_id, category_id, provider_id
      } = request.all()
      const product = await Product.create({
        name, description, price, image_id, category_id, provider_id
      })
      const trasformProduct = await transform.item(product, Transformer)

      return response.status(201).send(trasformProduct)
    } catch (error) {
      console.log(error);
      return response.status(400).send({ message: 'Erro ao processar as sua solicitação!' })
    }
  }

  /**
   * Display a single product.
   * GET products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params: { id }, response, transform }) {
    try {
      const product = await Product.findOrFail(id)
      const trasformProduct = await transform.item(product, Transformer)
      return response.send(trasformProduct)
    } catch (error) {
      return response.status(400).send({ message: 'Erro ao processar as sua solicitação!' })
    }
  }

  /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params: { id }, request, response, transform }) {
    try {
      const product = await Product.findOrFail(id)
      const {
        name, description, price, image_id, category_id, provider_id
      } = request.all()
      product.merge({
        name, description, price, image_id, category_id, provider_id
      })
      await product.save()
      const trasformProduct = await transform.item(product, Transformer)
      return response.send(trasformProduct)
    } catch (error) {
      return response.status(400).send({ message: 'Erro ao processar as sua solicitação!' })
    }
  }

  /**
   * Delete a product with id.
   * DELETE products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params: { id }, request, response }) {
    try {
      const product = await Product.findOrFail(id)
      await product.delete()
      return response.status(204).send()
    } catch (error) {
      return response.status(400).send({ message: 'Erro ao processar as sua solicitação!' })
    }
  }
}

module.exports = ProductController
