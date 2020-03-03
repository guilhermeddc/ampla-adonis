'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')
const ImageTransformer = use('App/Transformers/Admin/ImageTransformer')

/**
 * TestimonialTransformer class
 *
 * @class TestimonialTransformer
 * @constructor
 */
class TestimonialTransformer extends BumblebeeTransformer {
  static get defaultInclude () {
    return ['image']
  }
  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
      client: model.client,
      architect: model.architect,
      description: model.description
    }
  }

  includeImage (model) {
    return this.item(model.getRelated('image'), ImageTransformer)
  }
}

module.exports = TestimonialTransformer
