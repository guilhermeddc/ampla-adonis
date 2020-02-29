'use strict'

const Model = use('Model')

class Post extends Model {
  file () {
    return this.belongsTo('App/Models/File')
  }
  user () {
    return this.belongsTo('App/Models/User')
  }
  comments () {
    return this.hasMany('App/Models/Comment')
  }
}

module.exports = Post
