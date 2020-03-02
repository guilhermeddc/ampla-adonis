'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProviderSchema extends Schema {
  up () {
    this.create('providers', (table) => {
      table.increments()
      table.string('title', 100)
      table.string('description', 254)
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
    this.drop('providers')
  }
}

module.exports = ProviderSchema
