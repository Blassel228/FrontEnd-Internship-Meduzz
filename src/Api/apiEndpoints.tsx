import baseApi from './baseApi';


const checkHealth = async (): Promise<boolean> => {
  try {
    const response = await baseApi.get('/');
    return response.status === 200;
  } catch (error) {
    console.error('Error checking health:', error);
    return false;
  }
};

 export default checkHealth;