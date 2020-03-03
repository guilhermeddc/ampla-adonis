'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class SlideIntro extends Model {
  images () {
    return this.belongsToMany('App/Models/Image')
  }

  product () {
    return this.belongsTo('App/Models/Product')
  }

  post () {
    return this.belongsTo('App/Models/Post')
  }
}

module.exports = SlideIntro
