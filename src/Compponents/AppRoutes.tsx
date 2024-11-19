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
import PrivateRoute from '../Compponents/PrivateRoute';
import PublicRoute from '../Compponents/PublicRoute';
import UserManagementPage from "../Pages/UserManagmentPage";
import AccountPage from "../Pages/AccountPage";

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
        </Routes>
    </Router>
);

export default AppRoutes;
