import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {useDispatch, useSelector} from 'react-redux';
import "./LogoutButton.css";
import {setUser} from "../Store/slices/userSlice";

const LogoutButton: React.FC = () => {
  const { logout, user: auth0User, isAuthenticated: auth0IsAuthenticated } = useAuth0();
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const username = auth0IsAuthenticated
    ? auth0User?.nickname
    : user?.user?.username;

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    dispatch(setUser({ user: {}}));
    logout();
  };

  return (
    <div className="logout">
      {username && <span>{username}</span>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogoutButton;
