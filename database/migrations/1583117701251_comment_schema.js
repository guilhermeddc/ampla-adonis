'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CommentSchema extends Schema {
  up () {
    this.create('comments', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.text('commentary').notNullable()
      table.boolean('accepted').defaultTo(true)
      table.integer('post_id').unsigned()
      table.timestamps()

      table
        .foreign('post_id')
        .references('id')
        .inTable('posts')
        .onDelete('cascade')
    })
  }

  down () {
    this.drop('comments')
  }
}

module.exports = CommentSchema
