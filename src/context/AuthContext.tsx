import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { User } from "@/types";

type AuthState = {
  user: null | User;
};

type AuthContextType = AuthState & {
  setUser: (user: User) => void;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  logout: () => Promise.resolve(),
});

export const AuthProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [user, setUser] = useState<null | User>(null);

  const logout = async () => {
    setUser(null);
    Cookies.remove("user");
  };

  useEffect(() => {
    const user = Cookies.get("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  return <AuthContext.Provider value={{ user, setUser, logout }}>{children}</AuthContext.Provider>;
};
