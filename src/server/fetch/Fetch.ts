import fetch, { Response as FetchResponse } from 'node-fetch';

export type THeader = {
  [index: string]: string
}

export type HTTPMethod = 'POST' | 'GET' | 'PUT' | 'DELETE';

export type TFetchOptions = {
  method?: HTTPMethod
  data?: any
  headers?: THeader
}

class Fetch {
  static get(url: string, options: TFetchOptions): Promise<FetchResponse> {
    const getOptions = options;
    getOptions.method = 'GET';
    return Fetch.fetch(url, getOptions);
  }

  static post(url: string, options: TFetchOptions): Promise<FetchResponse> {
    const getOptions = options;
    getOptions.method = 'POST';
    return Fetch.fetch(url, getOptions);
  }

  static put(url: string, options: TFetchOptions): Promise<FetchResponse> {
    const getOptions = options;
    getOptions.method = 'PUT';
    return Fetch.fetch(url, getOptions);
  }

  static delete(url: string, options: TFetchOptions): Promise<FetchResponse> {
    const getOptions = options;
    getOptions.method = 'DELETE';
    return Fetch.fetch(url, getOptions);
  }

  static fetch(url: string, options: TFetchOptions = { method: 'GET' }): Promise<FetchResponse> {
    let { headers } = options;
    const { method, data } = options;
    let body = data;
    if (method !== 'GET') {
      if (!(data instanceof FormData)) {
        headers = {
          ...headers,
          'Content-type': 'application/json',
        };
        body = JSON.stringify(data);
      }
    }
    const fetchObject = { method, body, headers };
    return fetch(url, fetchObject).then((res) => {
      if (res.ok) {
        return res;
      }
      return Promise.reject(res);
    }).catch((err) => Promise.reject(err));
  }
}

export default Fetch;
