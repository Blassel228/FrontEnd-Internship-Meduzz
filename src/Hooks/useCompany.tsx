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
      setError('');
    } catch (error: any) {
      setError(error.response?.data?.detail || "Error fetching company details.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (
    companyId: number | string,
    updatedCompany: { name: string; description: string; visible: boolean }
  ) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      await baseApi.put(
        `/company/${companyId}`,
        updatedCompany,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setCompany(updatedCompany);
      setError('');
    } catch (error: any) {
      setError(error.response?.data?.detail || "Error updating company details.");
    } finally {
      setLoading(false);
    }
  };

   const handleDelete = async (companyId: number | string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      await baseApi.delete(`/company/${companyId}/owner`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCompany(null);
      setError('');
    } catch (error: any) {
      setError(error.response?.data?.detail || "Error deleting company.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (newCompany: { name: string; description: string; visible: boolean }) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await baseApi.post(
        "/company",
        newCompany,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setCompany(response.data);
      setError('');
      return response.data;
    } catch (error: any) {
      setError(error.response?.data?.detail || "Error creating company.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { company, loading, error, handleUpdate, handleDelete, setCompany, fetchCompany, handleCreate };
};

export default useCompany;
