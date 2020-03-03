'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')
const ImageTransformer = use('App/Transformers/Admin/ImageTransformer')
const CategoryTransformer = use('App/Transformers/Admin/CategoryTransformer')
const ProviderTransformer = use('App/Transformers/Admin/ProviderTransformer')

/**
 * ProductTransformer class
 *
 * @class ProductTransformer
 * @constructor
 */
class ProductTransformer extends BumblebeeTransformer {
  static get defaultInclude () {
    return ['image', 'images', 'category', 'provider']
  }
  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
      name: model.name,
      commentary: model.commentary,
      accepted: model.accepted
    }
  }

  includeImage (model) {
    return this.item(model.getRelated('image'), ImageTransformer)
  }

  includeImages (model) {
    return this.collection(model.getRelated('images'), ImageTransformer)
  }

  includeCategory (model) {
    return this.item(model.getRelated('category'), CategoryTransformer)
  }

  includeProvider (model) {
    return this.item(model.getRelated('provider'), ProviderTransformer)
  }
}

module.exports = ProductTransformer
