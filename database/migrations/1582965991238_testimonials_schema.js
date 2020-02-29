'use strict'

const Schema = use('Schema')

class TestimonialsSchema extends Schema {
  up () {
    this.create('testimonials', table => {
      table.increments()
      table.string('client')
      table.string('architect')
      table.text('description')
      table
        .integer('image')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down () {
    this.drop('testimonials')
  }
}

module.exports = TestimonialsSchema
