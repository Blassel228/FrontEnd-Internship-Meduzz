import { useParams } from 'react-router-dom';
import {users} from '../Constants/users';

const UserProfilePage = () => {
  const { id } = useParams();
  const foundUser = users.find((user) => user.id === parseInt(id || ''));

  if (!foundUser) {
    return <div>User not found.</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {foundUser.name}</p>
      <p>Email: {foundUser.email}</p>
    </div>
  );
};

export default UserProfilePage;

