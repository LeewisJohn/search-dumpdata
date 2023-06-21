import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
import { createBrowserHistory } from 'history'

import RootAPI from '../api'

import ProductStore from './Product/ProductStore'
import AlertStore from './Alert/AlertStore'
import ErrorsStore from './Errors/ErrorsStore'

const browserHistory = createBrowserHistory()
const routingStore = new RouterStore()

export const history = syncHistoryWithStore(browserHistory, routingStore)

class RootStore {
  productStore: ProductStore
  routingStore: RouterStore
  errorsStore: ErrorsStore
  alertStore: AlertStore

  constructor() {
    const rootAPI = new RootAPI({ rootStore: this })

    this.productStore = new ProductStore({ rootStore: this, rootAPI })
    this.errorsStore = new ErrorsStore({ rootStore: this, rootAPI })
    this.alertStore = new AlertStore({ rootStore: this, rootAPI })
    this.routingStore = routingStore
  }
}

export default new RootStore()
