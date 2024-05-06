import { Route, Routes } from 'react-router-dom';
import './App.css';
import SecuredPage from './home/SecuredPage';
import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';
import MissingPage from './error/MissingPage';
import HomePage from './home/HomePage';
import Layout from './utils/Layout';
import RequireAuth from './utils/RequireAuth';
import RegisterConfirmPage from './auth/RegisterConfirmPage';
import TransactionByAccount from './transactions/TransactionByAccount';
import TransactionByClientId from './transactions/TransactionByClientId';
import TransactionAll from './transactions/TransactionAll';
import TransactionDetail from './transactions/TransactionDetail';
import RegistrationInstructionsPage from './auth/RegistrationInstructionsPage';
import ForgotPasswordPage from './auth/ForgotPasswordPage';
import ResetPasswordPage from './auth/ResetPasswordPage';
import RequireRole from './utils/RequireRoles';


function App() {

  return (
    <>
       <Routes>
          <Route path="/" element={<Layout />}>
            
            <Route path="/" element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="register-instructions" element={<RegistrationInstructionsPage />} />
            <Route path="register-confirm" element={<RegisterConfirmPage />} />

            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="reset-password" element={<ResetPasswordPage />} />


            <Route element={<RequireAuth />}>
              <Route path="/secured" element={<SecuredPage />} />

              <Route element={<RequireRole requiredRole="VIEW_CLIENTS" />}>
                <Route path="/transactions/account/:accountNumber" element={<TransactionByAccount />} />
                <Route path="/transactions/client/:clientId" element={<TransactionByClientId />} />
                <Route path="/transactions/:id" element={<TransactionDetail />} />
                <Route path="/transactions" element={<TransactionAll />} />
              </Route>
              
            </Route>




            <Route path="*" element={<MissingPage />} />
          </Route>
       </Routes>
    </>

  )
}

export default App
