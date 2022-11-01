import { useState, useEffect } from 'react';
import { apiEndpoint } from '../config/apiEndpoint';

const useFetch = ({ url, method, body, token }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(apiEndpoint() + url, {
      method,
      body,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => setError(err))
      .finally(setLoading(false));
  }, [body, method, token, url]);

  return { loading, data, error };
};

export default useFetch;
