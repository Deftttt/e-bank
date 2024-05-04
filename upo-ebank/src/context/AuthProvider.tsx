import { createContext, useState, useEffect } from "react";
import {jwtDecode} from 'jwt-decode';  
import { LoginData, login as authServiceLogin } from '../auth/services/AuthService';
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setAuth({
                    token,
                    email: decodedToken.e, 
                });
            } catch (error) {
                console.error('Failed to decode token', error);
            }
        }
    }, []);

    const login = async (loginData: LoginData) => {
        const response = await authServiceLogin(loginData);
        if (response.accessToken) {
            localStorage.setItem("accessToken", response.accessToken);
            const decodedToken = jwtDecode(response.accessToken);
            setAuth({
                token: response.accessToken,
                email: decodedToken.e, 
            });
        }
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        setAuth(null);
    };


    return (
        <AuthContext.Provider value={{ auth, setAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
