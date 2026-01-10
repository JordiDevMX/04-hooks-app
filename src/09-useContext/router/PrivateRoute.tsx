import { use, type JSX } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router";

interface Props {
  element: JSX.Element; // O React.ReactNode
}

export const PrivateRoute = ({ element }: Props) => {
  const { authStatus } = use(UserContext);
  if (authStatus === "checking") {
    // * De esta manera se puede agregar el indicador de carga para el usuario
    // return <div>Loading...</div>;
    // * Esto hace que se evite el "parpadeo" de al intentar ir a la pagina de
    // profile sin estar loggeado
    return null;
  }

  if (authStatus === "authenticated") {
    //  TODO OPTIONAL: Hacer la ruta publica la cual es exactamente a esta ruta privada
    //   ? Basicamente es evitar que el usuario vea el login page si esta autenticado
    return element;
  }

  return <Navigate to="login" replace />;
};
