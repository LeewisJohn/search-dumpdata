import { makeAutoObservable } from "mobx"
import { Product } from '../../interfaces/Product'

export default class ProductStore {
  loading: boolean = false
  products: Product[] = []
  rootStore: any
  rootAPI: any
  searchQuery: string = ""
  page: number = 0
  limit: number = 20
  total: number = 0

  constructor(args: { rootStore: any; rootAPI: any }) {
    makeAutoObservable(this)
    this.rootStore = args.rootStore
    this.rootAPI = args.rootAPI
  }

  setSearchQuery = (searchQuery: string = ""): void => {
    if (this.searchQuery !== searchQuery) {
      this.searchQuery = searchQuery
      this.page = 0
      this.products = []
      this.loading = true
      this.total = 0
    }
  }

  setPage = (page: number): void => {
    this.page = page
  }

  searchProduct = async (): Promise<void> => {
    this.loading = true

    try {
      if (this.limit * this.page > this.total) return
      const res = await this.rootAPI.productAPI.searchProduct(
        this.limit,
        this.limit * this.page,
        this.searchQuery
      )
      if (res) {
        const { products, total } = res
        if (total !== 0) {
          this.total = total
        }
        this.products = [...this.products, ...products]
      }
    } catch (err) {
      this.rootStore.errorsStore.addError(err)
    } finally {
      this.loading = false
    }
  }
}