import { useState } from "react";
import { useDispatch } from "react-redux";
import baseApi from "../Api/baseApi";
import { setFetchedUser, clearFetchedUser } from "../Store/slices/fetchedUserSlice";

const useUserManagement = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const fetchUser = async (id: string) => {
    try {
      setLoading(true);
      const response = await baseApi.get(`/user/${id}`);
      dispatch(setFetchedUser(response.data));
      setError(null);
    } catch (error: any) {
      setError(error.response?.data?.detail);
      dispatch(clearFetchedUser());
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id: string, updatedData: any) => {
    try {
      setLoading(true);
      const response = await baseApi.put(`/user/${id}`, updatedData);
      dispatch(setFetchedUser(response.data));
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

  return { loading, error, setError, fetchUser, updateUser, deleteUser };
};

export default useUserManagement;
