'use strict'

const Route = use('Route')


Route.group(() => {
  Route.resource('posts', 'PostController').apiOnly()
  Route.resource('posts.comments', 'CommentController').apiOnly()
}).prefix('v1/blog')
  .namespace('Blog')
