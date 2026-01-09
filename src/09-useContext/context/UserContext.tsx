import { createContext, useState, type PropsWithChildren } from "react";
import type { User } from "../data/user-mock.data";
import { users } from "../data/user-mock.data";

type AuthStatus = "checking" | "authenticated" | "not-authenticated";

interface UserContextProps {
  // State
  authStatus: AuthStatus;
  user: User | null;

  // Methods
  login: (userId: number) => boolean;
  logout: () => void;
}

export const UserContext = createContext({});

// Hay mil maneras de tipar el children, pero esta es la mas eficiente de todas ()
// Los providers son HOC: Higher Order Component
export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [authStatus, setAuthStatus] = useState("checking");
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userId: number) => {
    console.log({ userId });
    return true;
  };

  const handleLogout = () => {
    console.log("logout");
  };

  // Se recomienda que el provider se use para logica de negocio,
  // no para regresar una interfaz
  //   return <>{children}</>;

  return (
    <UserContext
      value={{
        authStatus: authStatus,
        user: user,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </UserContext>
  );
};
