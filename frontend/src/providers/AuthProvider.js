import { createContext } from "react";

const initialState = {
  user: null,
  login: () => {},
  logout: () => {},
  loading: true,
};


export const AuthContext = createContext(initialState);

const AuthProvider = ({ children }) => {
  const auth = useProviderAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
};
