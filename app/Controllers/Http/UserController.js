'use strict'

const User = use('App/Models/User')
const tableColumns = ['username', 'email', 'password']

class UserController {
  async store ({ request }) {
    const data = request.only(tableColumns)

    const user = await User.create(data)

    return user
  }
}

module.exports = UserController
