import { useParams } from 'react-router-dom';
import baseApi from "../Api/baseApi";
import { useEffect, useState } from "react";

interface Company {
  name: string;
  description: string;
}

const CompanyProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const getCompany = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await baseApi.get(`/company/visible/${id}`);
        setCompany(response.data);
      } catch (err) {
        console.error('Error fetching company:', err);
        setError('Failed to fetch company.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getCompany();
    }
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
      <p>Industry: {company.description}</p>
    </div>
  );
};

export default CompanyProfilePage;
