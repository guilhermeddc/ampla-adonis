'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
  images () {
    return this.belongsToMany('App/Models/Image')
  }

  image () {
    return this.belongsTo('App/Models/Image')
  }

  provider () {
    return this.belongsTo('App/Models/Provider')
  }

  category () {
    return this.belongsTo('App/Models/Category')
  }
}

module.exports = Product
