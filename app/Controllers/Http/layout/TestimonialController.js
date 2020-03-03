'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Testimonial = use('App/Models/Testimonial')
const Transformer = use('App/Transformers/Layout/TestimonialTransformer')
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
  async index ({ transform, response, pagination }) {
    try {
      const testimonials = await Testimonial.query().paginate(pagination.page, pagination.limit)
      const trasformTestimonials = await transform.paginate(testimonials, Transformer)
      return response.send(trasformTestimonials)
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
  async store ({ transform, request, response }) {
    try {
      const { client, architect, description, image_id } = request.all()
      const testimonial = await Testimonial.create({ client, architect, description, image_id })
      const trasformTestimonial = await transform.paginate(testimonial, Transformer)
      return response.status(201).send(trasformTestimonial)
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
  async update ({ params: { id }, transform, request, response }) {
    try {
      const testimonial = await Testimonial.findOrFail(id)
      const { client, architect, description, image_id } = request.all()
      testimonial.merge({ client, architect, description, image_id })
      await testimonial.save()
      const trasformTestimonial = await transform.paginate(testimonial, Transformer)
      return response.status(200).send(trasformTestimonial)
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
