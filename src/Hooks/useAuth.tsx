import { useState} from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from '../Store/slices/userSlice';
import baseApi from '../Api/baseApi';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const { loginWithRedirect, user: auth0User, isAuthenticated: auth0IsAuthenticated, logout,  } = useAuth0();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOrdinaryLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const payload = new URLSearchParams();
      payload.append('username', username);
      payload.append('password', password);

      const loginResponse = await baseApi.post(
        'http://localhost:8000/token/login',
        payload,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const token = loginResponse.data.access_token;
      localStorage.setItem('authToken', token);

      const userResponse = await baseApi.get('/token/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(
        setUser({
          user: {
            email: userResponse.data.email,
            id: userResponse.data.id,
            username: userResponse.data.username,
          },
        })
      );
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid username or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleAuth0Login = async () => {
    setLoading(true);
    setError(null);

    try {
      await loginWithRedirect();
    } catch (err) {
      console.error('Auth0 login error:', err);
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    dispatch(clearUser());
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    error,
    loading,
    auth0User,
    auth0IsAuthenticated,
    handleOrdinaryLogin,
    handleAuth0Login,
    handleLogout,
  };
};
