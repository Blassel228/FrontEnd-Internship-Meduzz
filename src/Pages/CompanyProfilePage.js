import React from 'react';
import { useParams } from 'react-router-dom';

const CompanyProfilePage = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Company Profile</h2>
      <p>Company ID: {id}</p>
    </div>
  );
};

export default CompanyProfilePage;
