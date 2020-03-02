'use strict'

const Route = use('Route')

Route.group(() => {
  Route.resource('projects', 'ProjectController').apiOnly()
  Route.resource('slide-intros', 'SlideIntroController').apiOnly()
  Route.resource('testimonials', 'TestimonialController').apiOnly()
}).prefix('v1')
  .namespace('Layout')
