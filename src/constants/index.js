export const API_BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';
export const GRAPHQL_ENDPOINT = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000/graphql';