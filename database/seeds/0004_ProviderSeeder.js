'use strict'

/*
|--------------------------------------------------------------------------
| ProviderAndProductSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class ProviderAndProductSeeder {
  async run () {
    await Factory.model('App/Models/Provider').createMany(10)
  }
}

module.exports = ProviderAndProductSeeder
