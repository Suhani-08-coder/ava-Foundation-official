export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://awadhvidyaarogyafoundation.org';

export const UPI_ID = import.meta.env.VITE_UPI_ID;
export const ORG_EMAIL = import.meta.env.VITE_ORG_EMAIL;


export const getEndpoint = (path) => {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('https')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${cleanPath}`;
};