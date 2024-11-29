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
import PrivateRoute from '../Components/PrivateRoute';
import PublicRoute from '../Components/PublicRoute';
import UserManagementPage from "../Pages/UserManagmentPage";
import AccountPage from "../Pages/AccountPage";
import CompanyPage from "../Pages/CompanyPage";
import UserRequestPage from "../Pages/UserRequestPage";
import UserInvitationPage from "../Pages/UserInvitationPage";
import OwnerInvitationPage from "../Pages/OwnerInvitationPage";
import OwnerRequestPage from "../Pages/OwnerRequestPage";
import CompanyMembersPage from "../Pages/CompanyMembersPage";

const AppRoutes: React.FC = () => (
  <Router>
    <Routes>
      <Route path={routerKeys.root} element={<WelcomePage />} />
      <Route path={routerKeys.about} element={<AboutPage />} />

      <Route
        path={routerKeys.login}
        element={
          <PublicRoute>
            <UserAuthorizationPage />
          </PublicRoute>
        }
      />
      <Route
        path={routerKeys.register}
        element={
          <PublicRoute>
            <UserRegistrationPage />
          </PublicRoute>
        }
      />

      <Route
        path={routerKeys.users}
        element={
          <PrivateRoute>
            <UsersListPage />
          </PrivateRoute>
        }
      />
      <Route
        path={routerKeys.userProfile}
        element={
          <PrivateRoute>
            <UserProfilePage />
          </PrivateRoute>
        }
      />
      <Route
        path={routerKeys.companies}
        element={
          <PrivateRoute>
            <CompanyListPage />
          </PrivateRoute>
        }
      />
      <Route
        path={routerKeys.companyProfile}
        element={
          <PrivateRoute>
            <CompanyProfilePage />
          </PrivateRoute>
        }
      />
      <Route
        path={routerKeys.userManage}
        element={
          <PrivateRoute>
            <UserManagementPage />
          </PrivateRoute>
        }
      />
      <Route
        path={routerKeys.account}
        element={
          <PrivateRoute>
            <AccountPage />
          </PrivateRoute>
        }
      />
      <Route
        path={routerKeys.companyRegister}
        element={
          <PrivateRoute>
            <CompanyPage />
          </PrivateRoute>
        }
      />
      <Route
        path={routerKeys.userInvitations}
        element={
          <PrivateRoute>
            <UserInvitationPage />
          </PrivateRoute>
        }
      />
      <Route
        path={routerKeys.userRequests}
        element={
          <PrivateRoute>
            <UserRequestPage />
          </PrivateRoute>
        }
      />
      <Route
        path={routerKeys.ownerRequests}
        element={
          <PrivateRoute>
            <OwnerRequestPage />
          </PrivateRoute>
        }
      />
      <Route
        path={routerKeys.ownerInvitations}
        element={
          <PrivateRoute>
            <OwnerInvitationPage />
          </PrivateRoute>
        }
      />

        <Route
        path={routerKeys.company_members}
        element={
          <PrivateRoute>
            <CompanyMembersPage />
          </PrivateRoute>
        }
      />
    </Routes>
  </Router>
);

export default AppRoutes;
