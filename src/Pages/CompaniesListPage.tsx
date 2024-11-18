import React, { useState, useEffect } from 'react';
import baseApi from '../Api/baseApi';

const CompanyListPage = () => {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getVisibleCompanies = async () => {
    try {
      const response = await baseApi.get('/company/visible');
      setCompanies(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch companies');
      setLoading(false);
    }
  };

  useEffect(() => {
    getVisibleCompanies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Companies</h1>
      <ul>
        {companies.map((company) => (
          <li key={company.id}>
            {company.name} - {company.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyListPage;
