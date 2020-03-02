'use strict'

const Route = use('Route')

// Auth
Route.post('users', 'UserController.store')
Route.post('sessions', 'SessionController.store')
Route.post('passwords', 'ForgotPasswordController.store')
Route.put('passwords', 'ForgotPasswordController.update')

// Files
Route.get('files/:id', 'FileController.show')

Route.group(() => {

  // Auth
  Route.put('users/:id', 'UserController.update')

  // Store
  Route.resource('products', 'ProductController').apiOnly()
  Route.resource('categories', 'CategoryController').apiOnly()
  Route.resource('providers', 'ProviderController').apiOnly()

  // Blog
  Route.resource('posts', 'PostController').apiOnly()
  Route.resource('posts.comments', 'CommentController').apiOnly()

  // Layout
  Route.resource('projects', 'ProjectController').apiOnly()
  Route.resource('intros', 'IntroController').apiOnly()
  Route.resource('testimonials', 'TestimonialController').apiOnly()

  // Files
  Route.post('files', 'FileController.store')

}).middleware(['auth'])

