import { Children, createContext } from "react";

type AuthContextsProps={
    token: string | null;
    isLoadeng: boolean;
    singIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;   
};

const AuthContexts = createContext<AuthContextsProps| undefined>(undefined);

const AuthProvider = ({children}: {children: React.ReactNode}) =>{
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};


export default AuthProvider;