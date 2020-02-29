'use strict'

const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', table => {
      table.increments()
      table.string('name').notNullable()
      table.decimal('price').notNullable()
      table.text('description').notNullable()
      table.boolean('sold').defaultTo('false')
      table
        .integer('category')
        .unsigned()
        .references('id')
        .inTable('categories')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('provider')
        .unsigned()
        .references('id')
        .inTable('providers')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
