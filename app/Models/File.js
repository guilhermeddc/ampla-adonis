'use strict'

const Model = use('Model')
const Env = use('Env')

class File extends Model {
  static get computed () {
    return ['url']
  }

  getUrl ({ id }) {
    return `${Env.get('APP_URL')}/files/${id}`
  }

  intro () {
    return this.hasMany('App/Models/Intro')
  }
  post () {
    return this.belongsTo('App/Models/Post')
  }
  testimonial () {
    return this.hasMany('App/Models/Testimonial')
  }
  product () {
    return this.hasMany('App/Models/Product')
  }
  project () {
    return this.hasMany('App/Models/Project')
  }
}

module.exports = File
