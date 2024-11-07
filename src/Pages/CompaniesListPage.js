import React from 'react';

const companies = [
  { id: 1, name: 'TechCorp', industry: 'Technology' },
  { id: 2, name: 'Foodies', industry: 'Food' },
  { id: 3, name: 'HealthPlus', industry: 'Healthcare' },
];

const CompanyListPage = () => {
  return (
    <div>
      <h1>Companies</h1>
      <ul>
        {companies.map((company) => (
          <li key={company.id}>
            {company.name} - {company.industry}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyListPage;
