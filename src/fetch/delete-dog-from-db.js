import { API_CONFIG } from "./config";
export const deleteDogFromDb = (dogId) => {
  return fetch(`${API_CONFIG.baseUrl}/${dogId}`, {
    method: "delete",
  });
};
