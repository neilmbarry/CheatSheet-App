import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { apiEndpoint } from '../config/apiEndpoint';

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
  console.error('useFetced reloaded using', url, body);

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
    const queryString = '?' + queryStringArray.join('&');

    const address = apiEndpoint() + url + queryString;
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
  }, [body, method, token, url, query, request, page, limit]);

  return { loading, data, error };
};

export default useFetch;

// function useFetch2(url) {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     setLoading('loading...');
//     setData(null);
//     setError(null);
//     const source = axios.CancelToken.source();
//     axios
//       .get(url, { cancelToken: source.token })
//       .then((res) => {
//         setLoading(false);
//         //checking for multiple responses for more flexibility
//         //with the url we send in.
//         setData(res);
//       })
//       .catch((err) => {
//         setLoading(false);
//         setError('An error occurred. Awkward..');
//       });
//     return () => {
//       source.cancel();
//     };
//   }, [url]);

//   return { data, loading, error };
// }

// export { useFetch2 };
