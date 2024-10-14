import { axiosConfig } from "../../configuration/axiosConfig";

const headers = {
    "Content-Type": "application/json",
};

export const consultarEjemplares = async () => {
  const token = sessionStorage.getItem("token");
  headers.token = token;
  return await axiosConfig.get("/ejemplares", {
    headers: headers,
  });
};