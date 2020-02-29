'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store')

Route.post('sessions', 'SessionController.store')

Route.post('passwords', 'ForgotPasswordController.store')
Route.put('passwords', 'ForgotPasswordController.update')

Route.get('files/:id', 'FileController.show')

Route.group(() => {
  Route.post('files', 'FileController.store')

  Route.resource('categories', 'CategoryController').apiOnly()
  Route.resource('providers', 'ProviderController').apiOnly()
  Route.resource('posts', 'PostController').apiOnly()
  Route.resource('comments', 'CommentController').apiOnly()
  Route.resource('products', 'ProductController').apiOnly()
  Route.resource('projects', 'ProjectController').apiOnly()
  Route.resource('testimonials', 'TestimonialController').apiOnly()
  Route.resource('intros', 'IntroController').apiOnly()
}).middleware(['auth'])

