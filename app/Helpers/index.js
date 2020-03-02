'use strict'

const crypto = use('crypto')
const Helpers = use('Helpers')

/**
 * Generate ramdon string
 *
 * @param { int } length - O tamanho da string que quer gerar
 * @param { string } - String randomica
 */


function str_random (len = 40) {
  return crypto
    .randomBytes(Math.ceil(len / 2))
    .toString('hex') // convert to hexadecimal format
    .slice(0, len) // return required number of characters
}

/**
 * Muve one file
 *
 * @param { FileJar } file - o arquivo a ser gerenciado
 * @param { string } path - caminho da pasta
 * @param { object<FileJar> }
 */

const manage_single_upload = async (file, path = null) => {
  path = path ? path : Helpers.publicPath('uploads')

  const random_name = await str_random(10)
  let filename = `${new Date().getTime()}-${random_name}.${file.subtype}`

  await file.move(path, {
    name: filename
  })

  return file
}

/**
 * Muve multiples files
 *
 * @param { FileJar } fileJar - o arquivo a ser gerenciado
 * @param { string } path - caminho da pasta
 * @param { object }
 */

const manage_multiple_upload = async (fileJar, path = null) => {
  path = path ? path : Helpers.publicPath('uploads')
  let successes = [], errors = []

  await Promise.all(
    fileJar.files.map(
      async file => {
        const random_name = await str_random(10)
        let filename = `${new Date().getTime()}-${random_name}.${file.subtype}`

        await file.move(path, {
          name: filename
        })

        if (file.moved()) {
          successes.push(file)
        } else {
          errors.push(file.error())
        }
      }
    )
  )
  return { successes, errors }
}


module.exports = {
  str_random,
  manage_single_upload,
  manage_multiple_upload
}
