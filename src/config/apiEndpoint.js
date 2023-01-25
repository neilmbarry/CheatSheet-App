export const apiEndpoint = () => {
  return 'https://cheat-sheet-api.herokuapp.com/api/v1/';
  if (process.env.NODE_ENV === 'production') {
    return 'PRODUCTION ENDPOINT';
  }
  return 'http://neils-macbook-pro.local:8000/api/v1/';
};
