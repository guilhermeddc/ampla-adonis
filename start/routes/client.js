'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */

const Route = use('Route')

/**
 * Client Routes
 */

Route.group(() => {
  Route.get('products', 'ProductController.index')
  Route.get('products/:id', 'ProductController.show')
})
  .prefix('v1')
  .namespace('Client')
