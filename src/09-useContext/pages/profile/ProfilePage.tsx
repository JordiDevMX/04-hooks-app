import { UserContext } from "@/09-useContext/context/UserContext";
import { Button } from "@/components/ui/button";
import { use } from "react";
import { Link } from "react-router";

export const ProfilePage = () => {
  const { user, logout } = use(UserContext);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">{user?.name}</h1>
      <p className="text-lg text-gray-600">{user?.title}</p>

      <hr className="my-4 w-full" />

      <div className="p-4 rounded">
        <p>
          <strong>Email:</strong> {user?.contact.email}
        </p>
        <p>
          <strong>Ubicación:</strong> {user?.contact.location}
        </p>
        <p>
          <strong>Proyectos:</strong> {user?.stats.projects}
        </p>
      </div>
      <Link to="/">
        <Button variant="destructive" className="mt-4" onClick={logout}>
          Salir
        </Button>
      </Link>
    </div>
  );
};
