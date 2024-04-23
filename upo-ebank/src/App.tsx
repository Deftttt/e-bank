import './App.css'
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';
import { LayersOutlined } from '@mui/icons-material';
import Layout from './Layout';
import RequireAuth from './RequireAuth';
import MissingPage from './MissingPage';
import SecuredPage from './SecuredPage';

function App() {

  return (
    <>
       <Routes>
          <Route path="/" element={<Layout />}>
            
            <Route path="/" element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />

            <Route element={<RequireAuth />}>
              <Route path="/secured" element={<SecuredPage />} />
            </Route>


            <Route path="*" element={<MissingPage />} />
          </Route>
       </Routes>
    </>

  )
}

export default App
