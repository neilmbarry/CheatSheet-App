export const apiEndpoint = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'PRODUCTION ENDPOINT';
  }
  return 'http://neils-macbook-pro.local:8000/api/v1/';
};
