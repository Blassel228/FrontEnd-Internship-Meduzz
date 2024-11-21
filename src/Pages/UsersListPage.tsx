import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../Store/slices/usersSlice';
import baseApi from "../Api/baseApi";
import { RootState } from "../Store/store";

const UsersPage = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state: RootState) => state.users);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [skip, setSkip] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await baseApi.get("/user/", {
        params: { skip, limit },
      });
      dispatch(setUsers(response.data));
    } catch (err) {
      setError('Failed to fetch users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [dispatch, skip, limit]);

  const handleSkipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkip(Number(e.target.value));
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(Number(e.target.value));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Users List</h2>

      <div>
        <label htmlFor="skip">Skip:</label>
        <input
          id="skip"
          type="number"
          value={skip}
          onChange={handleSkipChange}
          min="0"
        />

        <label htmlFor="limit">Limit:</label>
        <input
          id="limit"
          type="number"
          value={limit}
          onChange={handleLimitChange}
          min="1"
        />
      </div>

      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
