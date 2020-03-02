'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
// const { str_random } = use('App/Helpers')
class PasswordReset extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeCreate', async model => {
      model.token = await str_random(25)
      const expired_at = new Date()
      expired_at.setMinutes(expired_at.getMinutes() + 30)
      model.expired_at = expired_at
    })
  }

  static get dates () {
    return ['created_at', 'update_at', 'expired_at']
  }
}

module.exports = PasswordReset
