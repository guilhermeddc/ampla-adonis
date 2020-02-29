'use strict'

const Model = use('Model')

class Testimonial extends Model {
  image () {
    return this.belongsTo('App/Models/File')
  }
}

module.exports = Testimonial
