import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { apiEndpoint } from '../config/apiEndpoint';

const useFetch = (
  {
    url = 'cocktails',
    method = 'GET',
    body = null,
    reload,
    query,
    neil,
    page,
    limit,
    queryObj,
  },
  dependency
) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [request, setRequest] = useState(false);
  const token = useSelector((state) => state.config.value.token);
  console.error('useFetch reloaded using', url, body);

  useEffect(() => {
    if (!neil) return;

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
        setRequest(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
        setLoading(false);
        setRequest(false);
      });
  }, [body, method, token, url, reload, query, request]);

  return { loading, data, error, reload, setRequest };
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
