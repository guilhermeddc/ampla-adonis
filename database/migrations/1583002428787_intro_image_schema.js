'use strict'

const Schema = use('Schema')

class IntroImageSchema extends Schema {
  up () {
    this.create('intro_images', table => {
      table.increments()
      table.string('file').notNullable()
      table.string('name').notNullable()
      table.string('type', 20)
      table.string('subtype', 20)
      table
        .integer('intro')
        .unsigned()
        .references('id')
        .inTable('intros')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down () {
    this.drop('intro_images')
  }
}

module.exports = IntroImageSchema
