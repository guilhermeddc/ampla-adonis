'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SlideIntroSchema extends Schema {
  up () {
    this.create('slide_intros', (table) => {
      table.increments()
      table.string('title', 80).notNullable()
      table.integer('image_logo_id').unsigned()
      table.integer('image_background_id').unsigned()
      table.boolean('link').defaultTo(false)
      table.enu('route', ['blog', 'produto', 'Loja'])
      table.integer('product_id').unsigned()
      table.integer('post_id').unsigned()
      table.timestamps()

      table
        .foreign('image_logo_id')
        .references('id')
        .inTable('images')
        .onDelete('cascade')
      table
        .foreign('image_background_id')
        .references('id')
        .inTable('images')
        .onDelete('cascade')
      table
        .foreign('product_id')
        .references('id')
        .inTable('products')
        .onDelete('cascade')
      table
        .foreign('post_id')
        .references('id')
        .inTable('posts')
        .onDelete('cascade')
    })
  }

  down () {
    this.drop('slide_intros')
  }
}

module.exports = SlideIntroSchema
