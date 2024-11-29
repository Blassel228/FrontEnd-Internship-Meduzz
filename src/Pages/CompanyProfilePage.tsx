import { useEffect, useCallback } from "react";
import useCompany from "../Hooks/useCompany";
import { useParams } from "react-router-dom";

const CompanyProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchCompany, loading, error, company } = useCompany();

  const fetchData = useCallback(() => {
    if (id) {
      fetchCompany(id);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!company) {
    return <div>Company not found.</div>;
  }

  return (
    <div>
      <h2>Company Profile</h2>
      <p>Name: {company.name}</p>
      <p>Description: {company.description}</p>
    </div>
  );
};

export default CompanyProfilePage;
