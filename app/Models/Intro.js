'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Intro extends Model {
  logo () {
    return this.belongsTo('App/Models/File')
  }
  background () {
    return this.belongsTo('App/Models/File')
  }
  product () {
    return this.belongsTo('App/Models/Product')
  }
  post () {
    return this.belongsTo('App/Models/Post')
  }
}

module.exports = Intro
