'use strict'

const Model = use('Model')

class Project extends Model {
  photo01 () {
    return this.belongsTo('App/Models/File')
  }
  photo02 () {
    return this.belongsTo('App/Models/File')
  }
  photo03 () {
    return this.belongsTo('App/Models/File')
  }
  photo04 () {
    return this.belongsTo('App/Models/File')
  }
}

module.exports = Project
