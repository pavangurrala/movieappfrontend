import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface AuthContextType {
  username: string | null;
  emailId: string | null;
  setUsername: (username: string | null) => void;
  setEmailId: (email: string | null) => void;
  logout:()=>void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [username, setUserNameState] = useState<string | null>(null);
  const [emailId, setEmailIdState] = useState<string | null>(null);

  useEffect(()=>{
    const storedUserName = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("emailId");
    if(storedUserName) setUserNameState(storedUserName);
    if(storedEmail) setEmailIdState(storedEmail);
  })
  
  const setUsername = (username:string | null) =>{
    setUserNameState(username);
    if(username){
        localStorage.setItem("username", username)
    }else{
        localStorage.removeItem("username")
    }
  }
  const setEmailId = (email:string | null) => {
    setEmailIdState(email)
    if(email){
        localStorage.setItem("emailId", email)
    }else{
        localStorage.removeItem("emailId")
    }
  }
  const logout = () =>{
    setUsername(null);
    setEmailId(null);
  }
  
  return (
    <AuthContext.Provider value={{ username, emailId, setUsername, setEmailId, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
