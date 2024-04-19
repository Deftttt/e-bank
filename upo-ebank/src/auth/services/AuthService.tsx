import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/auth', 
});

export type LoginData = {
    email: string;
    password: string;
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


export const login = (loginData: LoginData) =>{
    return api
        .post("/login", loginData, {headers: { 'Content-type': 'application/json' }})
        .then((response) => {
        if (response.data.accessToken) {
            localStorage.setItem("accessToken", JSON.stringify(response.data.accessToken));
        }

        return response.data;
        });
}


export const logout = () => {
    localStorage.removeItem("accessToken");
};


export const register = (registerData: RegisterData) =>{
  return api
    .post("/signup", registerData, {headers: { 'Content-type': 'application/json' }})
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("accessToken", JSON.stringify(response.data.accessToken));
      }

      return response.data;
    });
}


export const authHeader = () => {
  const token = JSON.parse(localStorage.getItem("accessToken"));
  if (token) {
      return { Authorization: "Bearer " + token }; 
  } else {
    return {};
  }
}

export const getToken = () => {
  return JSON.parse(localStorage.getItem("accessToken"));
};
