import axios from 'axios'

axios.interceptors.response.use(response => response.data, error => Promise.reject(error.response))

export default class Request {
  rootStore: any
  constructor(args: { rootStore: any }) {
    this.rootStore = args.rootStore
  }

  getHeaders = () => {
    let headers = {
      'Content-Type': 'application/json',
    }

    // Authorization EX
    /* const { auth } = authStore

    if (auth?.accessToken) {
      headers = {
        ...headers,
        Authorization: `${auth.tokenType || 'Bearer'} ${auth.accessToken}`,
      }
    } */

    return headers
  }

  requestFactory = (url: any, method: any, config = {}) => new Promise((resolve, reject) => {
    const apiEndpoint = 'https://dummyjson.com' // can store in another file
    const headers = this.getHeaders()
    const configData: any = {
      baseURL: apiEndpoint,
      url,
      method,
      headers,
      ...config,
    }

    axios(configData)
      .then((data: any) => {
        if (!data) {
          const error = {
            title: 'Error',
            description: data.message || 'An unknown error occurred',
            type: data.type,
            code: data.code,
          }
          reject(error)
        } else {
          resolve(data)
        }
      })
      .catch((err) => {
        if (err) {
          if (err.data) {
            const {
              data: { error: errorTitle, error_description: errorDescription },
            } = err
            if (errorTitle && errorDescription) {
              const errorMessage = {
                status: err.status,
                title: errorTitle,
                description: errorDescription,
              }
              reject(errorMessage)
            }
          }

          const error = {
            status: err.status,
            title: 'Error',
            description: err.message,
          }
          reject(error)
        }

        const defaultError = {
          title: 'Error',
          description: 'An unknown error occurred',
        }
        reject(defaultError)
      })

  })

  get = (url: any, config: any) => this.requestFactory(url, 'get', config)
}
