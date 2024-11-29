import { useState } from "react";
import { useDispatch } from "react-redux";
import baseApi from "../Api/baseApi";
import { setFetchedUser, clearFetchedUser } from "../Store/slices/fetchedUserSlice";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const useUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [registrationData, setRegistrationData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const dispatch = useDispatch();

  const validateInputs = () => {
    if (!emailRegex.test(registrationData.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (registrationData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    if (registrationData.password !== registrationData.confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    return true;
  };

  const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateInputs()) {
      return;
    }

    try {
      const checkResponse = await baseApi.get(
        `/user/check?email=${registrationData.email}&username=${registrationData.username}`
      );
      const checkData = checkResponse.data;

      if (checkData.exists) {
        setError(checkData.message);
        return;
      }
    } catch (err) {
      console.error("Error checking user existence:", err);
      setError("An error occurred while checking user existence. Please try again.");
      return;
    }

    try {
      await baseApi.post("/user/", {
        username: registrationData.username,
        email: registrationData.email,
        password: registrationData.password,
      });

      setSuccess("User registered successfully!");
      setRegistrationData({ username: '', email: '', password: '', confirmPassword: '' });
    } catch (err) {
      console.error("Error registering user:", err);
      setError("Registration failed. Please try again.");
    }
  };

  const fetchUser = async (id: string) => {
    try {
      setLoading(true);
      const response = await baseApi.get(`/user/${id}`);
      dispatch(setFetchedUser({ user: response.data }));
      setError(null);
      return response.data
    } catch (error: any) {
      setError(error.response?.data?.detail || "Failed to fetch user.");
      dispatch(clearFetchedUser());
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id: string, updatedData: any) => {
    try {
      setLoading(true);
      const response = await baseApi.put(`/user/${id}`, updatedData);
      dispatch(setFetchedUser({ user: response.data }));
      setError(null);
      return response.data;
    } catch (err) {
      setError("Failed to update user.");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      setLoading(true);
      const response = await baseApi.delete(`/user/${id}`);
      dispatch(clearFetchedUser());
      setError(null);
      return response.data;
    } catch (err) {
      setError("Failed to delete user.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,
    setError,
    registrationData,
    setRegistrationData,
    registerUser,
    fetchUser,
    updateUser,
    deleteUser,
  };
};

export default useUser;
