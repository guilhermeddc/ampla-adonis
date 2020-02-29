'use strict'

const Schema = use('Schema')

class IntroSchema extends Schema {
  up () {
    this.create('intros', table => {
      table.increments()
      table.string('title')
      table.enu('route', ['Blog', 'Produtos', 'Loja'])
      table.boolean('link').defaultTo('false')
      table
        .integer('product')
        .unsigned()
        .references('id')
        .inTable('products')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('post')
        .unsigned()
        .references('id')
        .inTable('posts')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down () {
    this.drop('intros')
  }
}

module.exports = IntroSchema
