import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }: any) => {

    const [auth, setAuth] = useState(() => {
        const token = localStorage.getItem("accessToken");
        return token ? JSON.parse(token) : null;
      });

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContext;