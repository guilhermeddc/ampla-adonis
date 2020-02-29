'use strict'

const Testimonial = use('App/Models/Testimonial')
const tableColumns = ['client', 'architect', 'description', 'image',]

class TestimonialController {
  async index ({ response }) {
    try {
      const testimonials = await Testimonial.query().with('user').fetch()
      return testimonials
    } catch (error) {
      response.status(400).send({ status: 400, message: error.message })
    }
  }

  async store ({ request, response }) {
    try {
      const data = request.only(tableColumns)
      const testimonials = await Testimonial.create(data)
      return testimonials
    } catch (error) {
      response.status(400).send({ status: 400, message: error.message })
    }
  }

  async show ({ params, response }) {
    try {
      const testimonials = await Testimonial.findOrFail(params.id)
      await testimonials.load('user')
      await testimonials.load('file')
      return testimonials
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

module.exports = TestimonialController
