import { makeAutoObservable } from "mobx"

export default class ErrorsStore {
  rootStore: any;
  rootAPI: any;

  constructor(args: { rootStore: any; rootAPI: any }) {
    makeAutoObservable(this)
    this.rootStore = args.rootStore
    this.rootAPI = args.rootAPI
  }

  addError = (error: { description: string; status: number; }) => {
    if (error) {
      if (error && error.description) {
        this.rootStore.alertStore.error({
          title: 'Error!',
          content: error.description,
        })
      }
    }
  }
}
