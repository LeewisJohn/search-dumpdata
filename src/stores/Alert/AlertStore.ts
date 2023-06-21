import { Modal } from 'antd'
import { makeAutoObservable } from "mobx"

export default class AlertStore {
  rootStore: any
  rootAPI: any
  defaultOptions: { maskClosable: boolean; }

  constructor(args: { rootStore: any; rootAPI: any }) {
    makeAutoObservable(this)
    this.rootStore = args.rootStore
    this.rootAPI = args.rootAPI
    this.defaultOptions = {
      maskClosable: true,
    }
  }

  _baseFn = (type: any) => (options: { timer: number | undefined }) => {
    const modal = (Modal as any)[type]({
      ...this.defaultOptions,
      ...options,
    })

    if (options.timer) {
      setTimeout(() => {
        modal.destroy()
      }, options.timer)
    }
  }

  info = this._baseFn('info')
  success = this._baseFn('success')
  error = this._baseFn('error')
  warning = this._baseFn('warning')
  confirm = this._baseFn('confirm')
}
