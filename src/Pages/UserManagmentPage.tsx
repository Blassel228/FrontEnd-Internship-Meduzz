import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store";
import useUser from "../Hooks/useUser";

const UserManagementPage = () => {
  const { loading, error, fetchUser, updateUser, deleteUser } = useUser();
  const user = useSelector((state: RootState) => state.fetchedUser.user);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<any | null>(null);
  const [inputId, setInputId] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleIdSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputId) {
      await fetchUser(inputId);
    }
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputId && formData) {
      await updateUser(inputId, formData);
      setEditMode(false);
    }
  };

  const handleDelete = async () => {
    if (inputId) {
      const confirmed = window.confirm("Are you sure you want to delete this user?");
      if (confirmed) {
        await deleteUser(inputId);
        alert("User deleted successfully");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Management</h2>

      <form onSubmit={handleIdSubmit}>
        <label htmlFor="userId">Enter User ID:</label>
        <input
          type="text"
          id="userId"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
        />
        <button type="submit">Fetch User</button>
      </form>

      {error && (<div>{error}</div>)}

      {user && (
        <>
          {!editMode ? (
            <div>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <button onClick={() => setEditMode(true)}>Edit User</button>
              <button onClick={handleDelete}>Delete User</button>
            </div>
          ) : (
            <form onSubmit={handleUpdateSubmit}>
              <div>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  defaultValue={user.username}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  defaultValue={user.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={handleInputChange}
                  placeholder="Enter new password"
                />
              </div>
              <button type="submit">Save Changes</button>
              <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default UserManagementPage;
