'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')
const ImageTransformer = use('App/Transformers/Admin/ImageTransformer')

/**
 * ProductTransformer class
 *
 * @class ProductTransformer
 * @constructor
 */
class ProductTransformer extends BumblebeeTransformer {
  static get defaultInclude () {
    return ['image', 'images']
  }
  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
      title: model.title,
      subtitle: model.subtitle,
      description: model.description
    }
  }

  includeImage (model) {
    return this.item(model.getRelated('image'), ImageTransformer)
  }

  includeImages (model) {
    return this.collection(model.getRelated('images'), ImageTransformer)
  }
}

module.exports = ProductTransformer
