'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const SlideIntro = use('App/Models/SlideIntro')
const Transformer = use('App/Transformers/Layout/SlideIntroTransformer')
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
  async index ({ transform, response, pagination }) {
    try {
      const slideIntros = await SlideIntro.query().paginate(pagination.page, pagination.limit)
      const trasformSlideIntros = await transform.paginate(slideIntros, Transformer)
      return response.send(trasformSlideIntros)
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
  async store ({ transform, request, response }) {
    try {
      const { title, link, route, product_id, post_id } = request.all()
      const slideIntro = await SlideIntro.create({ title, link, route, product_id, post_id })
      const trasformSlideIntro = await transform.paginate(slideIntro, Transformer)
      return response.status(201).send(trasformSlideIntro)
    } catch (error) {
      return response.status(400).send({ message: 'Erro ao processar a sua solicitação!' })
    }
  }

  /**
   * Update slideintro details.
   * PUT or PATCH slideintros/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params: { id }, transform, request, response }) {
    try {
      const slideintro = await SlideIntro.findOrFail(id)
      const { title, description, image_id } = request.all()
      slideintro.merge({ title, description, image_id })
      await slideintro.save()
      const trasformSlideIntro = await transform.paginate(slideIntro, Transformer)
      return response.status(200).send(trasformSlideIntro)
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
