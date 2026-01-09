import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

import { users, type User } from "../data/user-mock.data";

type AuthStatus = "checking" | "authenticated" | "not-authenticated";

interface UserContextProps {
  // State
  authStatus: AuthStatus;
  user: User | null;

  // Methods
  login: (userId: number) => boolean;
  logout: () => void;
}

export const UserContext = createContext({} as UserContextProps);

// Hay mil maneras de tipar el children, pero esta es la mas eficiente de todas ()
// Los providers son HOC: Higher Order Component
export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>("checking");
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userId: number) => {
    const user = users.find((user) => user.id === userId);
    if (!user) {
      console.log(`User not found ${userId}`);
      setUser(null);
      setAuthStatus("not-authenticated");
      return false;
    }

    setUser(user);
    setAuthStatus("authenticated");
    localStorage.setItem("userId", userId.toString());
    return true;
  };

  const handleLogout = () => {
    console.log("logout");
    setAuthStatus("not-authenticated");
    setUser(null);
    localStorage.removeItem("userId");
  };

  useEffect(() => {
    // TODO: Implementar funcion de "Salir" (cerrar sesion)
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      handleLogin(+storedUserId);
      return;
    }

    handleLogout();
  }, []);

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
