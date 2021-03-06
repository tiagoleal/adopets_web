import React, { createContext, useCallback, useState, useContext } from "react";
import api from "../services/api";

import { message } from "antd";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem("@Auth:token");
    const user = localStorage.getItem("@Auth:user");

    if (token && user) {
      api.defaults.headers.Authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post("sessions", {
      email,
      password,
    });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    localStorage.setItem("@Auth:token", token);
    localStorage.setItem("@Auth:user", JSON.stringify(user));

    message.success("Login registered successfully!");

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("@Auth:token");
    localStorage.removeItem("@Auth:user");

    message.success("Logout registered successfully!");

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem("@Auth:user", JSON.stringify(user));

      setData({
        token: data.token,
        user,
      } as AuthState);
    },
    [data.token]
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
