'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */

const Route = use('Route')

/**
 * Admin Routes
 */

Route.group(() => {
  Route.resource('categories', 'CategoryController')
    .apiOnly()
  // .validator(new Map([
  //   [['categories.store'], ['Admin/StoreCategory']],
  //   [['categories.update'], ['Admin/StoreCategory']]
  // ]))
  Route.resource('providers', 'ProviderController').apiOnly()
  Route.resource('products', 'ProductController').apiOnly()
  Route.resource('images', 'ImageController').apiOnly()
  Route.resource('users', 'UserController').apiOnly()
})
  .prefix('v1/admin')
  .namespace('Admin')
  .middleware(['auth'])
