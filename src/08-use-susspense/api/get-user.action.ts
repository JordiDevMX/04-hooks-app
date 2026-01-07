export interface User {
  id: number;
  name: string;
  location: string;
  sole: string;
}

export const getUserAction = async (id: number) => {
  await new Promise((res) => setTimeout(resizeBy, 2000));

  return {
    id: id,
    name: "Jordan Garcia",
    location: "Gdl, Jal",
    role: "Software Developer",
  };
};
