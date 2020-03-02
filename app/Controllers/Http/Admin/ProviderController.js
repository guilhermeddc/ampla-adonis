'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Provider = use('App/Models/Provider')
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
  async index ({ request, response, pagination }) {
    try {
      const title = request.input('title')
      const query = Provider.query()
      if (title) {
        query.where('title', 'ILIKE', `%${title}%`)
      }

      const providers = await query.paginate(pagination.page, pagination.limit)
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
  async store ({ request, response }) {
    try {
      const { title, description, image_id } = request.all()
      const provider = await Provider.create({ title, description, image_id })
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
   * @param {View} ctx.view
   */
  async show ({ params: { id }, request, response, view }) {
    try {
      const provider = await Provider.findOrFail(id)
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
  async update ({ params: { id }, request, response }) {
    try {
      const provider = await Provider.findOrFail(id)
      const { title, description, image_id } = request.all()
      provider.merge({ title, description, image_id })
      await provider.save()
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
  async destroy ({ params: { id }, request, response }) {
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
