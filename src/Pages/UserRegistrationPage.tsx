import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import useUser from "../Hooks/useUser";

const UserRegistrationPage = () => {
  const { loginWithRedirect } = useAuth0();
  const { registrationData, setRegistrationData, error, success, registerUser } = useUser();

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input
          type="text"
          placeholder="Username"
          value={registrationData.username}
          onChange={(e) => setRegistrationData({ ...registrationData, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={registrationData.email}
          onChange={(e) => setRegistrationData({ ...registrationData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={registrationData.password}
          onChange={(e) => setRegistrationData({ ...registrationData, password: e.target.value })}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={registrationData.confirmPassword}
          onChange={(e) => setRegistrationData({ ...registrationData, confirmPassword: e.target.value })}
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
