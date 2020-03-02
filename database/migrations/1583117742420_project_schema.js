'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectSchema extends Schema {
  up () {
    this.create('projects', (table) => {
      table.increments()
      table.string('title', 200)
      table.string('subtitle', 200)
      table.text('description')
      table.integer('image_id').unsigned()
      table.timestamps()

      table
        .foreign('image_id')
        .references('id')
        .inTable('images')
        .onDelete('cascade')
    })

    this.create('image_project', (table) => {
      table.increments()
      table.integer('image_id').unsigned()
      table.integer('project_id').unsigned()
      table.timestamps()

      table
        .foreign('image_id')
        .references('id')
        .inTable('images')
        .onDelete('cascade')
      table
        .foreign('project_id')
        .references('id')
        .inTable('projects')
        .onDelete('cascade')
    })
  }

  down () {
    this.drop('image_project')
    this.drop('projects')
  }
}

module.exports = ProjectSchema
