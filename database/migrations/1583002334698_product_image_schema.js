'use strict'

const Schema = use('Schema')

class ProductImageSchema extends Schema {
  up () {
    this.create('product_images', table => {
      table.increments()
      table.string('file').notNullable()
      table.string('name').notNullable()
      table.string('type', 20)
      table.string('subtype', 20)
      table
        .integer('product')
        .unsigned()
        .references('id')
        .inTable('products')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down () {
    this.drop('product_images')
  }
}

module.exports = ProductImageSchema
