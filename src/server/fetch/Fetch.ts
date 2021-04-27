import fetch, { Response as FetchResponse } from 'node-fetch';

export type THeader = {
  [index: string]: string
}

export type TFetchOptions<T> = {
  method?: 'POST' | 'GET' | 'PUT' | 'DELETE'
  data?: T
  headers?: THeader
}

class Fetch {
  static get<T>(url: string, options: TFetchOptions<T>): Promise<FetchResponse> {
    const getOptions = options;
    getOptions.method = 'GET';
    return Fetch.fetch(url, getOptions);
  }

  static post<T>(url: string, options: TFetchOptions<T>): Promise<FetchResponse> {
    const getOptions = options;
    getOptions.method = 'POST';
    return Fetch.fetch(url, getOptions);
  }

  static put<T>(url: string, options: TFetchOptions<T>): Promise<FetchResponse> {
    const getOptions = options;
    getOptions.method = 'PUT';
    return Fetch.fetch(url, getOptions);
  }

  static delete<T>(url: string, options: TFetchOptions<T>): Promise<FetchResponse> {
    const getOptions = options;
    getOptions.method = 'DELETE';
    return Fetch.fetch(url, getOptions);
  }

  static fetch<T>(url: string, options: TFetchOptions<T> = { method: 'GET' }): Promise<FetchResponse> {
    const { method, data, headers } = options;
    let body = (data as unknown)as string;
    if (method !== 'GET') {
      if (!(data instanceof FormData)) {
        headers['Content-type'] = 'application/json';
        body = JSON.stringify(data);
      }
    }
    return fetch(url, { method, body, headers }).then((res) => {
      if (res.ok) {
        return res;
      }
      return Promise.reject(res);
    }).catch((err) => Promise.reject(err));
  }
}

export default Fetch;
