import { useState } from 'react';
import baseApi from '../Api/baseApi';
import { validateEmail, validatePassword } from '../Utils/formValidation';

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
    const emailError = validateEmail(user.email);
    if (emailError) {
      setError(emailError);
      return false;
    }

    const passwordError = validatePassword(user.password, user.confirmPassword);
    if (passwordError) {
      setError(passwordError);
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
