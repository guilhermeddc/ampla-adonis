'use strict'

const Schema = use('Schema')

class TestimonialsSchema extends Schema {
  up () {
    this.create('testimonials', table => {
      table.increments()
      table.string('client')
      table.string('architect')
      table.text('description')
      table.timestamps()
    })
  }

  down () {
    this.drop('testimonials')
  }
}

module.exports = TestimonialsSchema
