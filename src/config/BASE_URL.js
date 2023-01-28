export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://cheat-sheet-api.herokuapp.com/api/v1/'
    : 'http://neils-macbook-pro.local:8000/api/v1/';
