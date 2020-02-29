'use strict'

const Provider = use('App/Models/Provider')
const tableColumns = ['name']

class ProviderController {
  async index ({ response }) {
    try {
      const providers = await Provider.all()
      return providers
    } catch (error) {
      response.status(400).send({ status: 400, message: error.message })
    }
  }

  async store ({ request, response }) {
    try {
      const data = request.only(tableColumns)
      const providers = await Provider.create(data)

      return providers
    } catch (error) {
      response.status(400).send({ status: 400, message: error.message })
    }
  }

  async show ({ params, response }) {
    try {
      const providers = await Provider.findOrFail(params.id)
      return providers
    } catch (error) {
      response.status(400).send({ status: 400, message: error.message })
    }
  }

  async update ({ params, request, response }) {
    try {
      const providers = await Provider.findOrFail(params.id)
      const data = request.only(['name'])

      providers.merge(data)
      await providers.save()

      return providers;
    } catch (error) {
      response.status(400).send({ status: 400, message: error.message })
    }
  }

  async destroy ({ params, response }) {
    try {
      const providers = await Provider.findOrFail(params.id)
      return providers.delete()
    } catch (error) {
      response.status(400).send({ status: 400, message: error.message })
    }
  }
}

module.exports = ProviderController
