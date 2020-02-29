'use strict'

const Model = use('Model')

class Product extends Model {
  category () {
    return this.belongsTo('App/Models/Category')
  }
  provider () {
    return this.belongsTo('App/Models/Provider')
  }
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

module.exports = Product
