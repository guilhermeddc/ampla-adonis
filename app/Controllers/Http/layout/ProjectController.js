'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Project = use('App/Models/Project')
const Transformer = use('App/Transformers/Layout/ProjectTransformer')
/**
 * Resourceful controller for interacting with projects
 */
class ProjectController {
  /**
   * Show a list of all projects.
   * GET projects
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {object} ctx.pagination
   */
  async index ({ transform, response, pagination }) {
    try {
      const projects = await Project.query().paginate(pagination.page, pagination.limit)
      const trasformProject = await transform.paginate(projects, Transformer)
      return response.send(trasformProject)
    } catch (error) {
      return response.status(400).send({ message: 'Erro ao processar a sua solicitação!' })
    }
  }

  /**
   * Create/save a new project.
   * POST projects
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ transform, request, response }) {
    try {
      const { title, subtitle, description, image_id } = request.all()
      const project = await Project.create({ title, subtitle, description, image_id })
      const trasformProject = await transform.paginate(project, Transformer)
      return response.status(201).send(trasformProject)
    } catch (error) {
      return response.status(400).send({ message: 'Erro ao processar a sua solicitação!' })
    }
  }

  /**
   * Update project details.
   * PUT or PATCH projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params: { id }, transform, request, response }) {
    try {
      const project = await Project.findOrFail(id)
      const { title, subtitle, description, image_id } = request.all()
      project.merge({ title, subtitle, description, image_id })
      await project.save()
      const trasformProject = await transform.paginate(project, Transformer)
      return response.status(200).send(trasformProject)
    } catch (error) {
      return response.status(400).send({ message: 'Erro ao processar a sua solicitação!' })
    }
  }

  /**
   * Delete a project with id.
   * DELETE projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params: { id }, response }) {
    try {
      const project = await Project.findOrFail(id)
      await project.delete()
      return response.status(204).send()
    } catch (error) {
      return response.status(400).send({ message: 'Erro ao processar a sua solicitação!' })
    }
  }
}

module.exports = ProjectController
