'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Project extends Model {
  image () {
    return this.belongsTo('App/Models/Image')
  }

  images () {
    return this.belongsToMany('App/Models/Image')
  }
}

module.exports = Project
