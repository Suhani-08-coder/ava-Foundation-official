const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://awadhvidyaarogyafoundation.org';
export const API_BASE_URL = rawBaseUrl.trim();

export const UPI_ID = import.meta.env.VITE_UPI_ID ? import.meta.env.VITE_UPI_ID.trim() : '';
export const ORG_EMAIL = import.meta.env.VITE_ORG_EMAIL ? import.meta.env.VITE_ORG_EMAIL.trim() : '';

export const getEndpoint = (path) => {
  if (!path) return '';
  
 
  const trimmedPath = path.trim();

  if (trimmedPath.startsWith('http') || trimmedPath.startsWith('https')) {
    return trimmedPath;
  }
  
  // Slash path ko properly normalize karein
  const cleanPath = trimmedPath.startsWith('/') ? trimmedPath : `/${trimmedPath}`;
  return `${API_BASE_URL}${cleanPath}`;
};