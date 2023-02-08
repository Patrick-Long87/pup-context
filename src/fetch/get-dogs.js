import { API_CONFIG } from "./config";

export const getDogs = () => {
  fetch(API_CONFIG.baseUrl).then((response) => {
    response.json();
  });
};
