export interface User {
  id: number;
  name: string;
  location: string;
  role: string;
}

export const getUserAction = async (id: number) => {
  console.log("Funcion llamada");
  await new Promise((res) => setTimeout(res, 2000));
  console.log("funcion resolvio");

  return {
    id: id,
    name: "Jordan Garcia",
    location: "Gdl, Jal",
    role: "Software Developer",
  };
};
