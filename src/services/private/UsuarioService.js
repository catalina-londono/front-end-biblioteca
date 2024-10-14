import { axiosConfig } from "../../configuration/axiosConfig";

const headers = {
    "Content-Type": "application/json",
};

export const consultarUsuarios = async () => {
  const token = sessionStorage.getItem("token");
  headers.token = token;
  return await axiosConfig.get("/usuarios", {
    headers: headers,
  });
};
