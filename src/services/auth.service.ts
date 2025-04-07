import { environment } from "../constants/environment";
import { Ilogin } from "../types/auth";
import { fetchAPI } from "../utils/fetch";

export const login = async (payload: Ilogin) => {
  const result = await fetchAPI(`${environment.API_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return result;
};
