import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
export const LoginPage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-4xl font-bold">Iniciar Sesion</h1>
      <hr />
      <form className="flex flex-col gap-2 my-10">
        <Input type="number" placeholder="ID del usuario" />
        <Button type="submit">Iniciar</Button>
        <Link to="/about">
          <Button variant="ghost">Volver a la pagina principal</Button>
        </Link>
      </form>
    </div>
  );
};
