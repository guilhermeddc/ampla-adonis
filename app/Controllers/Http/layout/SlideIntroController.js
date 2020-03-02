'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const SlideIntro = use('App/Models/SlideIntro')
/**
 * Resourceful controller for interacting with slideintros
 */
class SlideIntroController {
  /**
   * Show a list of all slideintros.
   * GET slideintros
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   * @param {object} ctx.pagination
   */
  async index ({ response, pagination }) {
    try {
      const slideintros = await SlideIntro.query().paginate(pagination.page, pagination.limit)
      return response.send(slideintros)
    } catch (error) {
      return response.status(400).send({ message: 'Erro ao processar a sua solicitação!' })
    }
  }

  /**
   * Create/save a new slideintro.
   * POST slideintros
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      const {
        title, image_logo_id, image_background_id, link, route, product_id, post_id
      } = request.all()
      const slideintro = await SlideIntro.create({
        title, image_logo_id, image_background_id, link, route, product_id, post_id
      })
      return response.status(201).send(slideintro)
    } catch (error) {
      return response.status(400).send({ message: 'Erro ao processar a sua solicitação!' })
    }
  }

  /**
   * Display a single slideintro.
   * GET slideintros/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Update slideintro details.
   * PUT or PATCH slideintros/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params: { id }, request, response }) {
    try {
      const slideintro = await SlideIntro.findOrFail(id)
      const { title, description, image_id } = request.all()
      slideintro.merge({ title, description, image_id })
      await slideintro.save()
      return response.status(200).send(slideintro)
    } catch (error) {
      return response.status(400).send({ message: 'Erro ao processar a sua solicitação!' })
    }
  }

  /**
   * Delete a slideintro with id.
   * DELETE slideintros/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params: { id }, response }) {
    try {
      const slideintro = await SlideIntro.findOrFail(id)
      await slideintro.delete()
      return response.status(204).send()
    } catch (error) {
      return response.status(400).send({ message: 'Erro ao processar a sua solicitação!' })
    }
  }
}

module.exports = SlideIntroController
