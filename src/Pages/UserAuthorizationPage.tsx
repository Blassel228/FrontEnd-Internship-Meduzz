import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useAuth } from '../Hooks/useAuth';
import { useAuth0 } from '@auth0/auth0-react';
import baseApi from '../Api/baseApi';
import { setAuthorizedUser, clearAuthorizedUser } from '../Store/slices/authorizedUserSlice';
import LogoutButton from '../Compponents/LogoutButton';
import {removeItem, setItem} from "../Utils/localStorage";


const UserAuthorizationPage = () => {
  const {
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
  } = useAuth();

  const {getAccessTokenSilently} = useAuth0();
  const dispatch = useDispatch();

  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    const storeAuth0UserData = async () => {
      if (auth0IsAuthenticated && auth0User) {
        try {
          const token = await getAccessTokenSilently();
          setItem('authToken', token);

          const response = await baseApi.post('/token/auth0/', {}, {
            headers: { Authorization: `Bearer ${token}` },
          });

          dispatch(setAuthorizedUser({ user: response.data }));
        } catch (err) {
          console.error('Error integrating Auth0 user:', err);
        }
      } else {
        dispatch(clearAuthorizedUser());
        removeItem('authToken');
      }
    };

    storeAuth0UserData();
  }, [auth0IsAuthenticated, auth0User, getAccessTokenSilently, dispatch]);

  return (
    <div>
      <LogoutButton />
      <h1>Login</h1>
      {!(auth0IsAuthenticated || user.isOrdinaryAuthenticated) ? (
        <div>
          <form onSubmit={handleOrdinaryLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <button onClick={handleAuth0Login} disabled={loading}>
            {loading ? 'Logging in...' : 'Login with Auth0'}
          </button>

          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      ) : (
        <div>
          <h3>
            Welcome, {user.user?.username || auth0User?.username} (
            {user?.user?.email || auth0User?.email})
          </h3>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default UserAuthorizationPage;
