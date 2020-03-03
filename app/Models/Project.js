'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Project extends Model {
  images () {
    return this.belongsToMany('App/Models/Image')
  }

  image () {
    return this.belongsTo('App/Models/Image')
  }
}

module.exports = Project
