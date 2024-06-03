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
import ClientAll from './clients/ClientAll';
import ClientById from './clients/ClientById';
import AccountsByNumber from './accounts/AccountsByNumber';
import ErrorPage from './error/ErrorPage';
import RequireRole from './utils/RequireRoles';
import SetupMfaPage from './auth/SetupMfaPage';
import UserUpdatePage from './users/UserUpdatePage';
import LoansListPage from './loans/LoansListPage';
import MoneyTransferPage from './transactions/MoneyTransferPage';
import LoanDetailsPage from './loans/LoanDetailsPage';
import LoanRequestPage from './loans/LoanRequestPage';
import LoanEmployeeDecisionPage from './loans/LoanEmployeeDecisionPage';
import LoansMainPage from './loans/LoansMainPage';
import AccountsListPage from './accounts/AccontsListPage';
import TransactionsPage from './transactions/TransactionsMainPage';
import AccountsMainPage from './accounts/AccountsMainPage';
import UserInfoPage from './users/UserInfoPage';
import CreateAccountPage from './accounts/CreateAccountPage';
import CreateClientAccountPage from './accounts/CreateClientAccountPage';

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

                <Route path="/transactions-page" element={<TransactionsPage />} />
                <Route path="/transactions/account/:accountNumber" element={<TransactionByAccount />} />
                <Route path="/transactions/client/:clientId" element={<TransactionByClientId />} />
                <Route path="/transactions/:id" element={<TransactionDetail />} />
                <Route path="/transactions" element={<TransactionAll />} />
                <Route path="/transactions/account/:accountNumber/transfer" element={<MoneyTransferPage />} />

                <Route path="/accounts-page" element={<AccountsMainPage />} />
                <Route path="/accounts/:accountNumber" element={<AccountsByNumber />} />
                <Route path="/accounts/clients/:clientId" element={<AccountsListPage />} />
                <Route path="/accounts" element={<AccountsListPage />} />
                <Route path="/create-account" element={<CreateAccountPage />} />

                <Route element={<RequireRole requiredRole={'MANAGE_ACCOUNTS'} />}>
                  <Route path="/create-account/clients/:clientId" element={<CreateClientAccountPage />} />
                </Route>
                

                <Route element={<RequireRole requiredRole={'VIEW_CLIENTS'} />}>
                  <Route path="/clients/:id" element={<ClientById />} />
                  <Route path="/clients" element={<ClientAll />} />
                </Route>

                <Route path="/loans-page" element={<LoansMainPage />} />
                <Route path="/loans/client/:clientId" element={<LoansListPage />} />
                <Route path="/loans/:id" element={<LoanDetailsPage />} />

                <Route element={<RequireRole requiredRole={'USER_RIGHTS'} />}>
                  <Route path="/request-loan" element={<LoanRequestPage />} />
                </Route>

                <Route element={<RequireRole requiredRole={'VIEW_LOANS'} />}>
                  <Route path="/loans" element={<LoansListPage />} />
                  <Route path="/loans/employee/:employeeId" element={<LoansListPage />} />
                </Route>
                
                <Route element={<RequireRole requiredRole={'APPROVE_LOANS'} />}>
                  <Route path="/loans/:loanId/decision" element={<LoanEmployeeDecisionPage />} />
                </Route>
                

                <Route path="/user-info" element={<UserInfoPage />} />
                <Route path="/setup-mfa" element={<SetupMfaPage />} />
                <Route path="/user-update/:userId" element={<UserUpdatePage />} />

            </Route>

            <Route path="/error" element={<ErrorPage />} />
            <Route path="*" element={<MissingPage />} />
          </Route>
       </Routes>
    </>

  )
}

export default App