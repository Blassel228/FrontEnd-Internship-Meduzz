import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routerKeys } from '../Constants/routerKeys';
import AboutPage from '../Pages/AboutPage';
import UserRegistrationPage from '../Pages/UserRegistrationPage';
import UserAuthorizationPage from '../Pages/UserAuthorizationPage';
import UsersListPage from '../Pages/UsersListPage';
import UserProfilePage from '../Pages/UserProfilerPage';
import CompanyListPage from '../Pages/CompaniesListPage';
import CompanyProfilePage from '../Pages/CompanyProfilePage';
import WelcomePage from '../Pages/WelcomePage';

const AppRoutes = () => (
 <Router>
  <Routes>
    <Route path={routerKeys.root} element={<WelcomePage />} />
    <Route path={routerKeys.about} element={<AboutPage />} />
    <Route path={routerKeys.register} element={<UserRegistrationPage />} />
    <Route path={routerKeys.login} element={<UserAuthorizationPage />} />
    <Route path={routerKeys.users} element={<UsersListPage />} />
    <Route path={routerKeys.userProfile} element={<UserProfilePage />} />
    <Route path={routerKeys.companies} element={<CompanyListPage />} />
    <Route path={routerKeys.companyProfile} element={<CompanyProfilePage />} />
  </Routes>
 </Router>
);

export default AppRoutes;
