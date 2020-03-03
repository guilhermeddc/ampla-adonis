'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')
const ImageTransformer = use('App/Transformers/Admin/ImageTransformer')
const ProductTransformer = use('App/Transformers/Admin/ProductTransformer')
const PostTransformer = use('App/Transformers/Admin/PostTransformer')

/**
 * ProductTransformer class
 *
 * @class ProductTransformer
 * @constructor
 */
class ProductTransformer extends BumblebeeTransformer {
  static get defaultInclude () {
    return ['images', 'product', 'post']
  }
  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
      title: model.title,
      link: model.link,
      route: model.route
    }
  }

  includeImages (model) {
    return this.collection(model.getRelated('images'), ImageTransformer)
  }

  includeProduct (model) {
    return this.item(model.getRelated('product'), ProductTransformer)
  }

  includePost (model) {
    return this.item(model.getRelated('post'), PostTransformer)
  }
}

module.exports = ProductTransformer
