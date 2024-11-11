import { useParams } from 'react-router-dom';
import { companies } from '../Constants/companies';

const CompanyProfilePage = () => {
  const { id } = useParams();
  const foundCompany = companies.find((company) => company.id === parseInt(id || ''));

  if (!foundCompany) {
    return <div>Company not found.</div>;
  }

  return (
    <div>
      <h2>Company Profile</h2>
      <p>Name: {foundCompany.name}</p>
      <p>Industry: {foundCompany.industry}</p>
    </div>
     );
  };

export default CompanyProfilePage;
