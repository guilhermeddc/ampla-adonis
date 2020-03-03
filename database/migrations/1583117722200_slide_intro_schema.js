'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SlideIntroSchema extends Schema {
  up () {
    this.create('slide_intros', (table) => {
      table.increments()
      table.string('title', 80).notNullable()
      table.boolean('link').defaultTo(false)
      table.enu('route', ['blog', 'produto', 'loja'])
      table.integer('product_id').unsigned()
      table.integer('post_id').unsigned()
      table.timestamps()

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

    this.create('image_slide_intro', (table) => {
      table.increments()
      table.integer('image_id').unsigned()
      table.integer('slide_intro_id').unsigned()
      table.timestamps()

      table
        .foreign('image_id')
        .references('id')
        .inTable('images')
        .onDelete('cascade')
      table
        .foreign('slide_intro_id')
        .references('id')
        .inTable('slide_intros')
        .onDelete('cascade')
    })
  }

  down () {
    this.drop('image_slide_intro')
    this.drop('slide_intros')
  }
}

module.exports = SlideIntroSchema
