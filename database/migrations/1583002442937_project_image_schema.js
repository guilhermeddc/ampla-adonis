'use strict'

const Schema = use('Schema')

class ProjectImageSchema extends Schema {
  up () {
    this.create('project_images', table => {
      table.increments()
      table.string('file').notNullable()
      table.string('name').notNullable()
      table.string('type', 20)
      table.string('subtype', 20)
      table
        .integer('project')
        .unsigned()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down () {
    this.drop('project_images')
  }
}

module.exports = ProjectImageSchema
