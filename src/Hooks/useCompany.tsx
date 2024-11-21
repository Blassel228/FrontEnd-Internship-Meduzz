import { useState } from "react";
import baseApi from "../Api/baseApi";

const useCompany = () => {
  const [company, setCompany] = useState<null | { visible: boolean; name: string; description: string }>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCompany = async (companyId: number | string) => {
    setLoading(true);
    try {
      const response = await baseApi.get(`/company/visible/${companyId}`);
      setCompany({
        visible: response.data.visible,
        name: response.data.name,
        description: response.data.description,
      });
    } catch (error: any) {
      setError(error.response?.data?.detail || "Error fetching company details.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (companyId: number | string, updatedCompany: { name: string; description: string; visible: boolean }) => {
    setLoading(true);
    try {
      await baseApi.put(`/company/${companyId}`, updatedCompany);
      setCompany(updatedCompany);
    } catch (error: any) {
      setError(error.response?.data?.detail || "Error updating company details.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (companyId: number | string) => {
    setLoading(true);
    try {
      await baseApi.delete(`/company/${companyId}/owner`);
      setCompany(null);
    } catch (error: any) {
      setError(error.response?.data?.detail || "Error deleting company.");
    } finally {
      setLoading(false);
    }
  };

  return { company, loading, error, handleUpdate, handleDelete, setCompany, fetchCompany };
};

export default useCompany;
