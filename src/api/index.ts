import ProductsAPI from './product'
import Request from '../helpers/requests'

export default class RootAPI {
  productAPI: ProductsAPI
  constructor(args: { rootStore: any }) {
    const { rootStore } = args
    const request = new Request({ rootStore })

    this.productAPI = new ProductsAPI({ request, rootStore })
  }
}
