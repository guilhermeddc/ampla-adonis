'use strict'

const Model = use('Model')
const Hash = use('Hash')

class User extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  static get hidden () {
    return ['password']
  }

  static get traits () {
    return [
      '@provider:Adonis/Acl/HasRole',
      '@provider:Adonis/Acl/HasPermission'
    ]
  }

  tokens () {
    return this.hasMany('App/Model0s. /Token')
  }

  image () {
    return this.belongsTo('App/Models/Image')
  }

  coupons () {
    return this.belongsToMany('App/Models/Coupon')
  }
}

module.exports = User
