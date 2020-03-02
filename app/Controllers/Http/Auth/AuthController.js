'use strict'

const Database = use('Database')
const User = use('App/Models/User')
const Role = use('Role')

class AuthController {
  async register ({ request, response }) {
    const trx = await Database.beginTransaction()
    try {
      const { name, surname, email, password } = request.all()

      const user = await User.create({ name, surname, email, password }, trx)

      const userRole = await Role.findBy('slug', 'client')
      await user.roles().attach([userRole.id], null, trx)
      await trx.commit()

      return response.status(201).send({ data: user })
    } catch (error) {
      await trx.rollback()
      return response.status(400).send({ message: 'Erro ao realizar o cadastro!' })
    }
  }

  async login ({ request, response, auth }) {
    try {
      const { email, password } = request.all()

      let data = await auth.withRefreshToken().attempt(email, password)

      return response.send({ data })
    } catch (error) {
      return response.status(401).send({ message: 'Erro ao realizar o login!' })
    }
  }

  async refresh ({ request, response, auth }) {
    try {
      let refreshToken = request.input('refresh_token')

      if (!refreshToken) {
        refreshToken = request.header('refresh_token')
      }

      const user = await auth.newRefreshToken().generateForRefreshToken(refreshToken)

      return response.send({ data: user })
    } catch (error) {
      response.status(400).send({ status: 400, message: error.message })
    }
  }

  async logout ({ request, response, auth }) {
    try {
      let refreshToken = request.input('refresh_token')

      if (!refreshToken) {
        refreshToken = request.header('refresh_token')
      }

      await auth.authenticator('jwt').revokeTokens([refreshToken], true)
      return response.status(204).send({})
    } catch (error) {
      response.status(400).send({ status: 400, message: error.message })
    }
  }

  // async forgot ({ request, response }) {
  //   try {

  //   } catch (error) {
  //     response.status(400).send({ status: 400, message: error.message })
  //   }
  // }

  // async remember ({ request, response }) {
  //   try {

  //   } catch (error) {
  //     response.status(400).send({ status: 400, message: error.message })
  //   }
  // }

  // async reset ({ request, response }) {
  //   try {

  //   } catch (error) {
  //     response.status(400).send({ status: 400, message: error.message })
  //   }
  // }
}

module.exports = AuthController
