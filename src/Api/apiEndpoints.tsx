import axiosInstance from './axiosInstance';


const checkHealth = async (): Promise<boolean> => {
  try {
    const response = await axiosInstance.get('/');
    return response.status === 200;
  } catch (error) {
    console.error('Error checking health:', error);
    return false;
  }
};

 export default checkHealth;