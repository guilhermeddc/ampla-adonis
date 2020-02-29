'use strict'

const Schema = use('Schema')

class TestimonialImageSchema extends Schema {
  up () {
    this.create('testimonial_images', table => {
      table.increments()
      table.string('file').notNullable()
      table.string('name').notNullable()
      table.string('type', 20)
      table.string('subtype', 20)
      table
        .integer('testimonial')
        .unsigned()
        .references('id')
        .inTable('testimonials')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down () {
    this.drop('testimonial_images')
  }
}

module.exports = TestimonialImageSchema
