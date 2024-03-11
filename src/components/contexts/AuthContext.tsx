import { FC, ReactNode, createContext, useEffect, useState } from "react";
import { AuthContextType, User } from "../../types";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const sessionAuth = sessionStorage.getItem("auth");

  useEffect(() => {
    if (sessionAuth) {
      setUser(JSON.parse(sessionAuth));
    }
  }, []);

  useEffect(() => {
    if (user && JSON.stringify(user) !== sessionAuth) {
      sessionStorage.setItem("auth", JSON.stringify(user));
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
