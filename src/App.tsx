import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutPage from './Pages/AboutPage';
import UserRegistrationPage from './Pages/UserRegistrationPage';
import UserAuthorizationPage from './Pages/UserAuthorizationPage';
import ListOfUsersPage from './Pages/UsersListPage';
import UserProfilePage from './Pages/UserProfilerPage';
import ListOfCompaniesPage from './Pages/CompaniesListPage';
import CompanyProfilePage from './Pages/CompanyProfilePage';
import WelcomePage from './Pages/WelcomePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/register" element={<UserRegistrationPage />} />
        <Route path="/login" element={<UserAuthorizationPage />} />
        <Route path="/users" element={<ListOfUsersPage />} />
        <Route path="/users/:id" element={<UserProfilePage />} />
        <Route path="/companies" element={<ListOfCompaniesPage />} />
        <Route path="/companies/:id" element={<CompanyProfilePage />} />
      </Routes>
    </Router>
  );
};

export default App;
