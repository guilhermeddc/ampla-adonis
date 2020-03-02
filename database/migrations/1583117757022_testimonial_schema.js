'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TestimonialSchema extends Schema {
  up () {
    this.create('testimonials', (table) => {
      table.increments()
      table.string('client', 80).notNullable()
      table.string('architect', 80).notNullable()
      table.text('description')
      table.integer('image_id').unsigned()
      table.timestamps()

      table
        .foreign('image_id')
        .references('id')
        .inTable('images')
        .onDelete('cascade')
    })
  }

  down () {
    this.drop('testimonials')
  }
}

module.exports = TestimonialSchema
