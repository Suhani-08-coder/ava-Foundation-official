const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

export const API_BASE_URL = isLocal 
  ? 'http://localhost:8080' 
  : 'https://awadhvidyaarogyafoundation.org';

export const UPI_ID = 'sy11suhani@okhdfcbank';
export const ORG_EMAIL = 'avaf@awadhfoundation.or';

export const getEndpoint = (path) => {
  if (!path) return '';
  const trimmedPath = path.trim();
  if (trimmedPath.startsWith('http') || trimmedPath.startsWith('https')) {
    return trimmedPath;
  }
  const cleanPath = trimmedPath.startsWith('/') ? trimmedPath : `/${trimmedPath}`;
  return `${API_BASE_URL}${cleanPath}`;
};