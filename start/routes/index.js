'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */

const Route = use('Route')

Route.get('/', () => {
  return { ampla: 'Ampla Móveis Decor' }
}).as('Home')

require('./auth')
require('./admin')
require('./client')
require('./blog')
require('./layout')
