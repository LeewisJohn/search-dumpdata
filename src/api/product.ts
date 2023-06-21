export default class ProductAPI {
  request: any
  rootStore: any

  constructor(args: { request: any; rootStore: any }) {
    this.rootStore = args.rootStore
    this.request = args.request
  }

  searchProduct = (limit: number, skip: number, searchQuery: string) =>
    this.request.get(`/products/search?q=${searchQuery}&limit=${limit}&skip=${skip}`, {})
}
