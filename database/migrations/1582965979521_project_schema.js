'use strict'

const Schema = use('Schema')

class ProjectSchema extends Schema {
  up () {
    this.create('projects', table => {
      table.increments()
      table.string('title')
      table.string('subtitle')
      table.text('description')
      table.timestamps()
    })
  }

  down () {
    this.drop('projects')
  }
}

module.exports = ProjectSchema
