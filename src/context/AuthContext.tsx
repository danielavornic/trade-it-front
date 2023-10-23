import { createContext, useReducer } from "react";

import { User, UserWithPassword } from "@/types";

type AuthState = {
  user: null | User;
  isLoading: boolean;
  error: null | string;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (user: UserWithPassword) => Promise<void>;
  logout: () => Promise<void>;
};

type AuthAction =
  | { type: "SIGNIN"; payload: User }
  | { type: "SIGNUP"; payload: UserWithPassword }
  | { type: "LOGOUT" };

// For now, we'll just use a fake user
const fakeUser: User = {
  id: 1,
  email: "yum3lo@gm.com",
  username: "yum3lo",
  name: "Yum3lo",
  surname: "Test",
};

const initialState: AuthState = {
  // Modify this to null to see the login screen
  user: null,
  isLoading: false,
  error: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
};

type AuthContextType = AuthState & {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (user: UserWithPassword) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  error: null,
  signIn: async () => {},
  signUp: async () => {},
  logout: async () => {},
});

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SIGNUP": {
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };
    }
    case "SIGNIN": {
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        user: null,
        isLoading: false,
      };
    }
    default: {
      return state;
    }
  }
};

export const AuthProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const signIn = async (email: string, password: string) => {
    const user: User = {
      id: 1,
      email,
      username: email.split("@")[0],
      name: "Yum3lo",
      surname: "Test",
    };

    dispatch({ type: "SIGNIN", payload: user });
  };

  const signUp = async (user: UserWithPassword) => {
    dispatch({ type: "SIGNUP", payload: user });
  };

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ ...state, signIn, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
