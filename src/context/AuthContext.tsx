import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { User } from "@/types";
import { decodeToken } from "react-jwt";

type AuthState = {
  user: null | User;
};

type AuthContextType = AuthState & {
  setUser: (user: User | null) => void;
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
    Cookies.remove("token");
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decoded = decodeToken(token) as any;
      const user = {
        id: Number(decoded?.user_id),
        username: decoded?.sub,
      };
      setUser(user);
    } else {
      setUser(null);
    }
  }, []);

  return <AuthContext.Provider value={{ user, setUser, logout }}>{children}</AuthContext.Provider>;
};
