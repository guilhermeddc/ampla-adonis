'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Provider = use('App/Models/Provider')
const Transformer = use('App/Transformers/Admin/ProviderTransformer')
/**
 * Resourceful controller for interacting with providers
 */
class ProviderController {
  /**
   * Show a list of all providers.
   * GET providers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {object} ctx.pagination
   */
  async index ({ request, response, transform, pagination }) {
    try {
      const title = request.input('title')
      const query = Provider.query()
      if (title) {
        query.where('title', 'ILIKE', `%${title}%`)
      }

      let providers = await query.paginate(pagination.page, pagination.limit)
      providers = await transform.paginate(providers, Transformer)
      return response.send(providers)
    } catch (error) {
      response.status(400).send({ status: 400, message: error.message })
    }
  }

  /**
   * Create/save a new provider.
   * POST providers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, transform }) {
    try {
      const { title, description, image_id } = request.all()
      let provider = await Provider.create({ title, description, image_id })
      provider = await transform.item(provider, Transformer)
      return response.status(201).send(provider)
    } catch (error) {
      return response.status(400).send({ message: 'Erro ao processar as sua solicitação!' })
    }
  }

  /**
   * Display a single provider.
   * GET providers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Transform} ctx.transform
   */
  async show ({ params: { id }, transform, response }) {
    try {
      let provider = await Provider.findOrFail(id)
      provider = await transform.item(provider, Transformer)
      return response.send(provider)
    } catch (error) {
      return response.status(400).send({ message: 'Erro ao processar as sua solicitação!' })
    }
  }

  /**
   * Update provider details.
   * PUT or PATCH providers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params: { id }, request, response, transform }) {
    try {
      let provider = await Provider.findOrFail(id)
      const { title, description, image_id } = request.all()
      provider.merge({ title, description, image_id })
      await provider.save()
      provider = await transform.item(provider, Transformer)
      return response.status(200).send(provider)
    } catch (error) {
      return response.status(400).send({ message: 'Erro ao processar as sua solicitação!' })
    }
  }

  /**
   * Delete a provider with id.
   * DELETE providers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params: { id }, response }) {
    try {
      const provider = await Provider.findOrFail(id)
      await provider.delete()
      return response.status(204).send()
    } catch (error) {
      return response.status(400).send({ message: 'Erro ao processar as sua solicitação!' })
    }
  }
}

module.exports = ProviderController
