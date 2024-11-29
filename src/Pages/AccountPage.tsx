import React, { useState } from "react";
import baseApi from "../Api/baseApi";
import {getItem, removeItem} from "../Utils/localStorage";
import {UserSelfUpdateData} from "../Interfaces/User";

const AccountPage = () => {
  const [username, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const token = getItem("authToken");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setError("Authorization token not found");
      return;
    }

    const updatedData: UserSelfUpdateData = {
      username: username,
      password: password,
    };

    try {
      setLoading(true);
      const response = await baseApi.put(
        "/user/self_update",
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response?.data?.message);
    } catch (error: any) {
      setError(error.response?.data?.detail);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!token) {
      setError("Authorization token not found");
      return;
    }

    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        setLoading(true);
        await baseApi.delete("/user/self_delete", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        alert("Your account has been deleted successfully.");
        removeItem("authToken");
        window.location.href = "/login";
      } catch (error: any) {
        setError(error.response?.data?.detail|| "An error occurred while deleting the profile.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <h2>Update Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handleDelete}
          style={{ backgroundColor: "red", color: "white", padding: "10px", border: "none", cursor: "pointer" }}
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete Account"}
        </button>
      </div>

      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default AccountPage;
