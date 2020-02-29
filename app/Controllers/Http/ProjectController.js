'use strict'

const Project = use('App/Models/Project')
const tableColumns = [
  'title',
  'subtitle',
  'description',
  'photo01',
  'photo02',
  'photo03',
  'photo04'
]

class ProjectController {
  async index ({ response }) {
    try {
      const projects = await Project.all()
      return projects
    } catch (error) {
      response.status(400).send({ status: 400, message: error.message })
    }
  }

  async store ({ request, response }) {
    try {
      const data = request.only(tableColumns)
      const projects = await Project.create(data)
      return projects
    } catch (error) {
      response.status(400).send({ status: 400, message: error.message })
    }
  }

  async show ({ params, response }) {
    try {
      const projects = await Project.findOrFail(params.id)
      return projects
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

module.exports = ProjectController
