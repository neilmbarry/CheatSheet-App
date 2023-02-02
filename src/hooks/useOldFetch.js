import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../config/BASE_URL';

const useFetch = ({
  url = 'cocktails',
  method = 'GET',
  body = null,
  query,
  page,
  limit,
  request,
  sort,
}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = useSelector((state) => state.config.value.token);

  useEffect(() => {
    page = 1;
  }, [query, sort]);

  useEffect(() => {
    if (!request) return;

    setLoading(true);

    const headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const queryStringArray = [];
    query && queryStringArray.push(`nameSearch=${query}`);
    page && queryStringArray.push(`page=${page}`);
    limit && queryStringArray.push(`limit=${limit}`);
    sort && queryStringArray.push(`sort=${sort}`);
    const queryString = '?' + queryStringArray.join('&');

    const address = BASE_URL + url + queryString;
    console.log('ADDRESS:', address);
    fetch(address, {
      method,
      body,
      headers,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('DATA RECIEVED FROM USEFETCH: ', data);
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
        setLoading(false);
      });
  }, [body, method, token, url, query, request, page, limit, sort]);

  return { loading, data, error };
};

export default useFetch;
