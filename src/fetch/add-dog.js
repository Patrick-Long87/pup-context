import { API_CONFIG } from "./config";
export const addDogToDb = ({ name, description, image }) => {
  const body = JSON.stringify({ name, description, isFavorite: false, image });

  return fetch(API_CONFIG.baseUrl, {
    method: "POST",
    headers: {
      ["Content-Type"]: "application/json",
    },
    body,
  });
};
