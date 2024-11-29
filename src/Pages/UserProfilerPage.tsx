import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setFetchedUser } from '../Store/slices/fetchedUserSlice';
import baseApi from "../Api/baseApi";
import {RootState} from "../Store/store";

const UserProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.fetchedUser.user);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await baseApi.get(`/user/${id}`);
        dispatch(setFetchedUser({user: response.data}));
      } catch (err) {
        setError('Failed to fetch user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [dispatch, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.username}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserProfilePage;
