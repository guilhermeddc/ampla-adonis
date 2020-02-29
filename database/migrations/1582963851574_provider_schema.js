'use strict'

const Schema = use('Schema')

class ProviderSchema extends Schema {
  up () {
    this.create('providers', table => {
      table.increments()
      table.string('name').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('providers')
  }
}

module.exports = ProviderSchema
