import { createContext, useState, useEffect } from "react";
import {jwtDecode} from 'jwt-decode';  
import { LoginData, login as authServiceLogin } from '../auth/services/AuthService';
import Loading from "../shared/ui/Loading";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setAuth({
                    token,
                    email: decodedToken.e,
                    roles: decodedToken.a,
                    id: decodedToken.sub
                });
            } catch (error) {
                console.error('Failed to decode token', error);
            }
        }
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    const login = async (loginData: LoginData) => {
        const response = await authServiceLogin(loginData);
        if (response.accessToken) {
            localStorage.setItem("accessToken", response.accessToken);
            const decodedToken = jwtDecode(response.accessToken);
            setAuth({
                token: response.accessToken,
                email: decodedToken.e,
                roles: decodedToken.a,
                id: decodedToken.sub
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
