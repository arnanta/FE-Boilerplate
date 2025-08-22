/**
 * @description This function logs detailed information about Axios errors to the console.
 * @param error - The error object from Axios
 */
export function axiosLogger(error: unknown) {
  if (
    typeof error === 'object' &&
    error !== null &&
    'isAxiosError' in error &&
    (error as any).isAxiosError === true
  ) {
    const axiosError = error as any; //AxiosError
    console.error('API Error Details:', {
      status: axiosError.response?.status,
      statusText: axiosError.response?.statusText,
      message: axiosError.message,
      url: axiosError.response?.config?.url,
      method: axiosError.response?.config?.method,
    });

    if (axiosError.response) {
      switch (axiosError.response?.status) {
        case 400:
          console.warn('Bad Request - Please check your input');
          break;
        case 401:
          console.warn('Unauthorized - Authentication required');
          break;
        case 403:
          console.warn('Forbidden - Access denied');
          break;
        case 404:
          console.warn('Not Found - Resource does not exist');
          break;
        case 429:
          console.warn('Too Many Requests - Rate limited');
          break;
        case 500:
          console.warn('Server Error - Please try again later');
          break;
        case 502:
        case 503:
        case 504:
          console.warn('Service Unavailable - Server is down or maintenance');
          break;
        default:
          console.warn(`HTTP Error ${axiosError.response.status}`);
      }
    }
  } else if (error instanceof Error) {
    // Handle regular JavaScript errors
    console.error('Request Error:', error.message);
  }
  // Always reject to allow individual API calls to handle errors
  return Promise.reject(error);
}
