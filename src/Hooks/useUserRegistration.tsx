import { useState } from 'react';
import baseApi from '../Api/baseApi';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

export const useUserRegistration = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validateInputs = () => {
    if (!emailRegex.test(user.email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (user.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }
    if (user.password !== user.confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateInputs()) {
      return;
    }

    try {
      const checkResponse = await baseApi.get(`/user/check?email=${user.email}&username=${user.username}`);
      const checkData = checkResponse.data;

      if (checkData.exists) {
        setError(checkData.message);
        return;
      }
    } catch (err) {
      console.error('Error checking user existence:', err);
      setError('An error occurred, please try again later.');
      return;
    }

    try {
      await baseApi.post('/user/', {
        username: user.username,
        email: user.email,
        password: user.password,
      });

      setSuccess('User registered successfully!');
      setUser({ username: '', email: '', password: '', confirmPassword: '' });
    } catch (err) {
      console.error('Error registering user:', err);
      setError('Registration failed. Please try again.');
    }
  };

  return {
    user,
    setUser,
    error,
    success,
    handleSubmit,
  };
};
