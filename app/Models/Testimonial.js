'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Testimonial extends Model {
  image () {
    return this.belongsTo('App/Models/Image')
  }
}

module.exports = Testimonial
