import { useEffect } from "react";
import { getUserAction } from "./api/get-user.action";

export const ClientInformation = ({ id }: { id: number }) => {
  useEffect(() => {
    return () => {
      getUserAction(id).then(console.log);
    };
  }, [id]);

  return (
    <div className="bg-gradient flex flex-col gap-4">
      <h2 className="text-4xl font-thin text-white">Jordi - #123</h2>
      <p className="text-white text-2xl">Gdl, Jal</p>
      <p className="text-white text-xl">Rol de usuario</p>
    </div>
  );
};
