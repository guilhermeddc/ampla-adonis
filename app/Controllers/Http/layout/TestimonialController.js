'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Testimonial = use('App/Models/Testimonial')
/**
 * Resourceful controller for interacting with testimonials
 */
class TestimonialController {
  /**
   * Show a list of all testimonials.
   * GET testimonials
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, pagination }) {
    try {
      const testimonials = await Testimonial.query().paginate(pagination.page, pagination.limit)
      return response.send(testimonials)
    } catch (error) {
      return response.status(400).send({ message: 'Erro ao processar a sua solicitação!' })
    }
  }

  /**
   * Create/save a new testimonial.
   * POST testimonials
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      const { client, architect, description, image_id } = request.all()
      const testimonial = await Testimonial.create({ client, architect, description, image_id })
      return response.status(201).send(testimonial)
    } catch (error) {
      return response.status(400).send({ message: 'Erro ao processar a sua solicitação!' })
    }
  }

  /**
   * Update testimonial details.
   * PUT or PATCH testimonials/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params: { id }, request, response }) {
    try {
      const testimonial = await Testimonial.findOrFail(id)
      const { client, architect, description, image_id } = request.all()
      testimonial.merge({ client, architect, description, image_id })
      await testimonial.save()
      return response.status(200).send(testimonial)
    } catch (error) {
      return response.status(400).send({ message: 'Erro ao processar a sua solicitação!' })
    }
  }

  /**
   * Delete a testimonial with id.
   * DELETE testimonials/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params: { id }, response }) {
    try {
      const testimonial = await Testimonial.findOrFail(id)
      await testimonial.delete()
      return response.status(204).send()
    } catch (error) {
      return response.status(400).send({ message: 'Erro ao processar a sua solicitação!' })
    }
  }
}

module.exports = TestimonialController
