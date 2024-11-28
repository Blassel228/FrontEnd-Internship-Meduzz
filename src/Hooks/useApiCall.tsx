import { useState } from 'react';

const useApiCall = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const makeApiCall = async (apiCall: () => Promise<any>, successMessage: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall();
      setSuccess(successMessage);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,
    setError,
    setSuccess,
    makeApiCall,
  };
};

export default useApiCall;
