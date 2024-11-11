import React from 'react';
import {companies} from '../Constants/companies'

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
