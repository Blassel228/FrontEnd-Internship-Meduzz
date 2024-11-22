import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useUserRegistration } from '../Hooks/useUserRegistration';

const UserRegistrationPage = () => {
  const { loginWithRedirect } = useAuth0();
  const { user, setUser, error, success, handleSubmit } = useUserRegistration();

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={user.confirmPassword}
          onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button type="submit">Register</button>
      </form>

      <hr />

      <h3>Or Register/Login Using Auth0</h3>
      <button onClick={() => loginWithRedirect()}>
        Register/Login with Auth0
      </button>
    </div>
  );
};

export default UserRegistrationPage;
