'use strict'

const User = use('App/Models/User')
const tableColumns = ['username', 'email', 'password', 'fullname']

class UserController {
  async store ({ request }) {
    try {
      const data = request.only(tableColumns)

      const user = await User.create(data)

      return user
    } catch (error) {
      response.status(400).send({ status: 400, message: error.message })
    }

  }

  async update ({ params, request, response }) {
    try {
      const user = await Provider.findOrFail(params.id)
      const data = request.only(tableColumns)

      user.merge(data)
      await user.save()

      return user;
    } catch (error) {
      response.status(400).send({ status: 400, message: error.message })
    }
  }
}

module.exports = UserController
