'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Image = use('App/Models/Image')
const { manage_single_upload, manage_multiple_upload } = use('App/Helpers')
const fs = use('fs')
/**
 * Resourceful controller for interacting with images
 */
class ImageController {
  /**
   * Show a list of all images.
   * GET images
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {object} ctx.pagination
   */
  async index ({ request, response, pagination }) {
    try {
      const images = await Image
        .query()
        .orderBy('id', 'DESC')
        .paginate(pagination.page, pagination.limit)
      return response.send(images)
    } catch (error) {
      return response.status(400).send({ message: 'Erro ao processar as sua solicitação!' })
    }
  }

  /**
   * Create/save a new image.
   * POST images
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      const fileJar = request.file('images', {
        types: ['image'],
        size: '2mb'
      })

      let images = []
      // upload unico
      if (!fileJar.files) {
        const file = await manage_single_upload(fileJar)
        if (file.moved()) {
          const image = await Image.create({
            path: file.fileName,
            size: file.size,
            original_name: file.clientName,
            extension: file.subtype
          })

          images.push(image)
          return response.status(201).send({ successes: images, errors: {} })
        }

        return response.status(400).send({ message: 'Não foi possivel processar a imagem!' })
      }

      // multiplo ulpload
      let files = await manage_multiple_upload(fileJar)

      await Promise.all(
        files.successes.map(
          async file => {
            const image = await Image.create({
              path: file.fileName,
              size: file.size,
              original_name: file.clientName,
              extension: file.subtype
            })

            images.push(image)
          }
        )
      )
      return response.status(201).send({ successes: images, errors: files.errors })
    } catch (error) {
      return response.status(400).send({ status: 400, message: error.message })
      // return response.status(400).send({ message: 'Não foi possivel processar a imagem!' })
    }
  }

  /**
   * Display a single image.
   * GET images/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params: { id }, request, response, view }) {
    try {
      const image = await Image.findOrFail(id)
      return response.send(image)
    } catch (error) {
      return response.status(400).send({ message: 'Erro ao processar as sua solicitação!' })
    }
  }

  /**
   * Update image details.
   * PUT or PATCH images/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params: { id }, request, response }) {
    try {
      const image = await Image.findOrFail(id)
      const { original_name } = request.all()
      image.merge({ original_name })
      await image.save()
      return response.status(200).send(image)
    } catch (error) {
      return response.status(400).send({ message: 'Erro ao processar as sua solicitação!' })
    }
  }

  /**
   * Delete a image with id.
   * DELETE images/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  // async destroy ({ params: { id }, response }) {
  //   try {
  //     const image = await Image.findOrFail(id)
  //     let filepath = Helpers.publicPath(`uploads/${image.path}`)

  //     await fs.unlink(filepath, err => {
  //       if (!err) {
  //         await image.delete()
  //       }
  //     })

  //     return response.status(204).send()
  //   } catch (error) {
  //     return response.status(400).send({ message: 'Não foi possivel deletar a imagem' })
  //   }
  // }
}

module.exports = ImageController
