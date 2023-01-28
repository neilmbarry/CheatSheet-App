import React from 'react';
import { useState } from 'react';
import { BASE_URL } from '../config/BASE_URL';

const constructOptions = (token, body, method) => {
  const optionsObject = {};
  optionsObject.headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  if (body) {
    optionsObject.body = JSON.stringify(body);
    // optionsObject.body = body;
  }
  if (method) {
    optionsObject.method = method;
  }
  return optionsObject;
};

const useBetterFetch = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});

  async function getRequest({ method = 'GET', body = null, token = null }) {
    setLoading(true);
    const options = constructOptions(token, body, method);
    console.log(options);
    try {
      const response = await fetch(BASE_URL + url, options);
      const data = await response.json();
      console.log(data);
      if (data.status === 'fail' || data.status === 'error') {
        setError(data.message);
        console.warn(data.message);
      }
      setData(data);
    } catch (err) {
      setError(err.message);
      console.warn(err);
    } finally {
      setLoading(false);
    }
  }

  return { getRequest, loading, error, data };
};

export default useBetterFetch;
