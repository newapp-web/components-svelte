class HttpRequest {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.interceptors = {
      request: [],
      response: []
    };
  }

  // Add a request interceptor
  addRequestInterceptor(interceptor) {
    this.interceptors.request.push(interceptor);
  }

  // Add a response interceptor
  addResponseInterceptor(interceptor) {
    this.interceptors.response.push(interceptor);
  }

  async request(method, url, data = null, options = {}) {
    // Apply request interceptors
    let config = { method, ...options };
    config.url = `${this.baseURL}${url}`;
    config.headers = config.headers || {};

    for (let interceptor of this.interceptors.request) {
      config = interceptor(config) || config;
    }

    // Prepare fetch options
    const fetchOptions = {
      method: config.method,
      headers: config.headers
    };

    if (method === 'GET' && data) {
      // Convert data to query string for GET request
      const params = new URLSearchParams(data).toString();
      config.url += `?${params}`;
    } else if (data) {
      fetchOptions.body = JSON.stringify(data);
    }

    // Execute the request
    let response;
    try {
      response = await fetch(config.url, fetchOptions);
    } catch (error) {
      // Handle network errors
      return Promise.reject(error);
    }

    // Apply response interceptors
    for (let interceptor of this.interceptors.response) {
      response = await interceptor(response) || response;
    }

    // Parse response
    let responseData;
    try {
      responseData = await response.json();
    } catch (error) {
      responseData = null;
    }

    if (!response.ok) {
      return Promise.reject(responseData);
    }

    return responseData;
  }

  get(url, params = {}, options = {}) {
    return this.request('GET', url, params, options);
  }

  post(url, data, options = {}) {
    return this.request('POST', url, data, options);
  }

  put(url, data, options = {}) {
    return this.request('PUT', url, data, options);
  }

  delete(url, data, options = {}) {
    return this.request('DELETE', url, data, options);
  }
}

export default HttpRequest