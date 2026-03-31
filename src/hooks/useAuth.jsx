import { useState, useEffect } from "react";
import * as authService from "../services/authService";

export default function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = authService.getUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = async (loginData) => {
    const data = await authService.login(loginData);
    setUser(data.usuario);
    return data;
  };

  const register = async (registerData) => {
    const data = await authService.register(registerData);
    setUser(data.usuario);
    return data;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const isAuthenticated = !!user;

  return {
    user,
    login,
    register,
    logout,
    isAuthenticated,
  };
}
