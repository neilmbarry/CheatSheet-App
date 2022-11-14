import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { apiEndpoint } from '../config/apiEndpoint';

const useFetch = ({ url, method = 'GET', body = null, reload, query }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.config.value.token);
  console.log('useFetch reloaded');
  useEffect(() => {
    if (!reload) return;
    console.warn('useFetch requested');
    setLoading(true);
    const headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    const queryString = query ? `?nameSearch=${query}` : '';
    fetch(apiEndpoint() + url + queryString, {
      method,
      body,
      headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
        console.log('DATA RECIEVED FROM USEFETCH: ', data);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
        setLoading(false);
      });
  }, [body, method, token, url, reload, query]);

  return { loading, data, error, reload };
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
