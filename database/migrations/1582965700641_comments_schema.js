'use strict'

const Schema = use('Schema')

class CommentsSchema extends Schema {
  up () {
    this.create('comments', table => {
      table.increments()
      table.string('author').notNullable()
      table.text('comments').notNullable()
      table.boolean('accepted').defaultTo('true')
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
    this.drop('comments')
  }
}

module.exports = CommentsSchema
