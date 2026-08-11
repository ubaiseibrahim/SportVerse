// export const API_BASE_URL = 'http://localhost:5001/api';
export const API_BASE_URL = 'https://api.scoreverse.in/api';
const HOST_URL = 'https://api.scoreverse.in';

export const getImageUrl = (path) => {
  if (!path || typeof path !== 'string') return null;
  
  // Normalize backslashes (important for live servers hosted on windows or certain DB paths)
  path = path.replace(/\\/g, '/');

  // If already a valid absolute HTTP(S) URL, return it directly
  if (path.startsWith('http://') || path.startsWith('https://')) {
    // Replace legacy localhost / 10.0.2.2 URLs with active BASE_URL host
    if (path.includes('localhost') || path.includes('10.0.2.2') || path.includes('127.0.0.1')) {
      const idx = path.indexOf('/uploads/');
      if (idx !== -1) {
        return `${HOST_URL}${path.substring(idx)}`;
      }
    }
    return path;
  }

  // Fix mangled Cloudinary / HTTP URLs returned by path.relative bug (e.g. /../../https:/res.cloudinary.com/...)
  const httpIdx = path.indexOf('http:/');
  const httpsIdx = path.indexOf('https:/');
  if (httpIdx !== -1 || httpsIdx !== -1) {
    const idx = httpsIdx !== -1 ? httpsIdx : httpIdx;
    let extractedUrl = path.substring(idx);
    // Restore protocol properly
    if (extractedUrl.startsWith('https:/') && !extractedUrl.startsWith('https://')) {
      extractedUrl = extractedUrl.replace('https:/', 'https://');
    } else if (extractedUrl.startsWith('http:/') && !extractedUrl.startsWith('http://')) {
      extractedUrl = extractedUrl.replace('http:/', 'http://');
    }
    return extractedUrl;
  }

  // If local device path (from image picker) or data URI
  if (path.startsWith('file://') || path.startsWith('content://') || path.startsWith('data:')) {
    return path;
  }
  
  // Fix previously uploaded absolute local paths (e.g. /Users/.../uploads/...)
  const uploadsIndex = path.indexOf('/uploads/');
  if (uploadsIndex !== -1) {
    path = path.substring(uploadsIndex);
  }

  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${HOST_URL}${cleanPath}`;
};

/**
 * Submit general contact form
 */
export async function sendContactMessage(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.message || 'Failed to send message');
    }
    return json;
  } catch (error) {
    console.error('API sendContactMessage Error:', error);
    throw error;
  }
}

/**
 * Submit App Launch Pre-registration (Notify Me)
 */
export async function sendAppNotifyRequest(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/contact/notify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.message || 'Failed to submit notification request');
    }
    return json;
  } catch (error) {
    console.error('API sendAppNotifyRequest Error:', error);
    throw error;
  }
}
