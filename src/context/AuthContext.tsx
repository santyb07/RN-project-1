import React,{ReactElement, createContext, useState,} from 'react'
import { View } from 'react-native';

export type GlobalAuthParam = {
    login:()=>void,
    logout:()=>void,
    isLoading:boolean,
    userToken:string | null,
}

export const AuthContext = createContext<GlobalAuthParam>({
    login:()=>{},
    logout:()=>{},
    isLoading:false,
    userToken:null,
});

const AuthProvider = ({children}:any) => {
    const [isLoading, setIsLoading]= useState(true);
    const [userToken,setUserToken] = useState<string | null>(null);

    const login=()=>{
        setUserToken('odsjfkdsjfklsjs');
        setIsLoading(false);
    }
    const logout = () =>{
        setUserToken(null);
        setIsLoading(false);
    }
  return (
    <AuthContext.Provider value={{login,logout,isLoading,userToken}}>
        {children}
    </AuthContext.Provider>
    
  )
}

export default AuthProvider