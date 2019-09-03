import queryString from 'query-string';

const request = async (url, options = {}) => {
  try {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');

    const requestOptions = {
      ...options,
      headers,
    };

    const response = await fetch(url, requestOptions);
    if (response.ok) {
      return response.json();
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  } catch (error) {
    throw error;
  }
}

const get = async (url, params) => {
  const paramsString = params ? `?${queryString.stringify(params)}` : '';
  const requestUrl = `${url}${paramsString}`;
  return request(requestUrl, {
    method: 'GET'
  });
};

const post = async (url, body) => {
  request(url, {
    method: 'POST',
    body: JSON.stringify(body)
  });
};

const patch = async (url, body) => {
  request(url, {
    method: 'PATCH',
    body: JSON.stringify(body)
  });
};

const deleteRequest = async (url) => {
  request(url, {
    method: 'DELETE'
  });
};

const fetchClient = {
  get,
  post,
  patch,
  delete: deleteRequest,
};

export default fetchClient;