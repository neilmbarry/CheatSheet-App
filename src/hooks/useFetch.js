import { useState } from 'react';
import { BASE_URL } from '../config/BASE_URL';

// This function takes the options as parameters and returns and options object to be passed when fetching data, typically used in POST and PATCH requests
const constructOptions = (token, body, method) => {
  const optionsObject = {};

  optionsObject.headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  if (body) {
    optionsObject.body = JSON.stringify(body);
  }
  if (method) {
    optionsObject.method = method;
  }
  return optionsObject;
};

const generateQueryString = (filters) => {
  if (!filters) return '';
  const { query, page, limit, sort } = filters;
  const queryStringArray = [];
  query && queryStringArray.push(`nameSearch=${query}`);
  page && queryStringArray.push(`page=${page}`);
  limit && queryStringArray.push(`limit=${limit}`);
  sort && queryStringArray.push(`sort=${sort}`);
  const queryString = '?' + queryStringArray.join('&');
  return queryString;
};

// This hook returns the fetchRequest method along with the loading, error and data states for the given request.
const useFetch = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});

  async function fetchRequest({ method = 'GET', body, token, filters }) {
    setLoading(true);
    console.log(method, body);
    const options = constructOptions(token, body, method);
    const queryString = generateQueryString(filters);
    console.log(BASE_URL + url + queryString, options);
    try {
      const response = await fetch(BASE_URL + url + queryString, options);
      const data = await response.json();
      if (data.status === 'fail' || data.status === 'error') {
        setError(data.message);
      }
      setData(data);
    } catch (err) {
      setError(err.message);
      console.warn(err);
    } finally {
      setLoading(false);
    }
  }

  return {
    fetchRequest,
    loading,
    response: {
      error,
      data,
    },
  };
};

export default useFetch;
