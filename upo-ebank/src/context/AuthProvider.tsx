import { createContext, useState, useEffect } from "react";
import {jwtDecode} from 'jwt-decode';  
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        console.log('Token from localStorage:', token); 
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                console.log('Decoded Token:', decodedToken);  
                setAuth({
                    token,
                    email: decodedToken.e, 
                });
            } catch (error) {
                console.error('Failed to decode token', error);
            }
        }
    }, [auth]);


    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
