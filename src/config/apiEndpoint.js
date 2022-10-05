export const apiEndpoint = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'PRODUCTION ENDPOINT';
  }
  return 'http://127.0.0.1:8000/';
};
