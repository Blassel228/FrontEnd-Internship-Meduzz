import React, { useState, useEffect } from 'react';
import baseApi from '../Api/baseApi';

const CompanyListPage = () => {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [skip, setSkip] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  const getVisibleCompanies = async () => {
    try {
      const response = await baseApi.get('/company/visible', {
        params: { skip, limit },
      });
      setCompanies(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch companies');
      setLoading(false);
    }
  };

  const handleSkipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkip(Number(e.target.value));
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(Number(e.target.value));
  };

  useEffect(() => {
    getVisibleCompanies();
  }, [skip, limit]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Companies</h1>
      <div>
        <label>Offset (skip): </label>
        <input
          type="number"
          value={skip}
          onChange={handleSkipChange}
          min="0"
        />
      </div>

      <div>
        <label>Limit: </label>
        <input
          type="number"
          value={limit}
          onChange={handleLimitChange}
          min="1"
        />
      </div>

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
