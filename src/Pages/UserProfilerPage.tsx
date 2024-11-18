import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import baseApi from "../Api/baseApi";

interface User {
  username: string;
  email: string;
}

const UserProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await baseApi.get(`/user/${id}`);
        setUser(response.data);
      } catch (err) {
        console.error('Error fetching user:', err);
        setError('Failed to fetch user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

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
