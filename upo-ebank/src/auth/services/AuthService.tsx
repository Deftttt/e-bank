import axios from 'axios';
import useAuth from '../../hooks/useAuth'

const api = axios.create({
  baseURL: 'http://localhost:8080/auth', 
});

export type LoginData = {
    email: string;
    password: string;
    mfaCode?: string;
}

export type RegisterData = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    pesel: string;
    city: string;
    street: string;
    localNumber: string;
    postCode: string;
    country: string;
}

export type ResetPasswordData = {
  token: string;
  newPassword: string;
}

export type MfaVerification = {
  email: string;
  code: string;
}


export const login = (loginData: LoginData) =>{
    return api
      .post("/login", loginData, {headers: { 'Content-type': 'application/json' }})
      .then((response) => {
        return response.data;
      });
}



export const register = (registerData: RegisterData) =>{
  return api
    .post("/signup", registerData, {headers: { 'Content-type': 'application/json' }})
    .then((response) => {
      return response.data;
    });
}

export const confirmRegistration = async (token: string) => {
  try {
    const response = await api.get(`/signup/confirm?token=${token}`);
    return { status: response.status, data: response.data };
  } catch (error) {
    if (error.response) {
      return { status: error.response.status, data: error.response.data };
    } else {
      return { status: 500, data: 'Network error' };
    }
  }
};


export const resendConfirmationEmail = (email: String) => {
  return api
    .post(`/signup/resend-confirmation?email=${email}`,  {headers: { 'Content-type': 'application/json' }})
    .then((response) => {
      return response.data;
    });
};

export const resetPassword = (data: ResetPasswordData) => {
  return api
    .post('/reset-password', data, {headers: { 'Content-type': 'application/json' }})
    .then((response) => {
      return response.data;
    });
};

export const sendForgotPasswordEmail = (email: String) => {
  return api
    .post(`/forgot-password?email=${email}`,  {headers: { 'Content-type': 'application/json' }})
    .then((response) => {
      return response.data;
    });
};

export const getMfaQrCode = () => {
  console.log(authHeader())
  return api
    .post('/setup-mfa', {}, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

export const verifyMfaSetup = (data: MfaVerification) => {
  return api
    .post('/verify-mfa', data, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};


export const authHeader = () => {
  const token = localStorage.getItem("accessToken") as string;
  if (token) {
       return { Authorization: "Bearer " + token }; 
  } else {
    return {};
  }
}


export const getToken = () => {
  return JSON.parse(localStorage.getItem("accessToken")  as string);
};
