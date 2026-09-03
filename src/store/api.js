// Small fetch wrapper shared by the Redux thunks.

const API_BASE_URL = typeof __API_BASE_URL__ !== 'undefined' ? __API_BASE_URL__ : 'http://localhost:4000/api';
export class ApiError extends Error {
  status;
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}
export async function apiRequest(path, options = {}) {
  const {
    method = 'GET',
    body,
    token,
    isFormData = false
  } = options;
  const headers = {};
  if (!isFormData) headers['Content-Type'] = 'application/json';
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? isFormData ? body : JSON.stringify(body) : undefined
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const message = data && (data.error?.message || data.error) || res.statusText;
    throw new ApiError(typeof message === 'string' ? message : 'Request failed', res.status);
  }
  return data;
}