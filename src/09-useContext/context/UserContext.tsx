import { useState, type PropsWithChildren } from "react";

// * Hay mil maneras de tipar el children, pero esta es la mas eficiente de todas
export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [name, setName] = useState("Jordi");
  // ? Se recomienda que el provider se use para logica de negocio,
  // ? no para regresar una interfaz
  return <>{children}</>;
};
