/* eslint-disable react/prop-types */
import { useState } from "react";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  //   const [token, setToken] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (resp) => {
    if (resp.email === "mario.rossi@gmail.com" && resp.password === "ciao") {
      setUser(resp);
      setIsLogged(true);
      console.log("Login effettuato!");

      navigate("/dashboard");
    } else {
      console.log("Login errato");
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLogged, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
