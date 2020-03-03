'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Provider extends Model {
  image () {
    return this.belongsTo('App/Models/Image')
  }
}

module.exports = Provider
