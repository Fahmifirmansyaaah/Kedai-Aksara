import { environment } from "../constants/environment";
import { fetchAPI } from "../utils/fetch";
import { getLocalStorage } from "../utils/storage";

export const getOrders = async () => {
  let url = `${environment.API_URL}/orders?page?1pageSize=10`;
  const result = await fetchAPI(url, {
    method: "GET",
    headers: {
      authorization: `Bearer ${getLocalStorage("auth")}`,
    },
  }).then((data) => data);

  return result;
};

export const UpdateOrder = async (id: string, payload: { status: string }) => {
  const result = await fetchAPI(`${environment.API_URL}/orders/${id}`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${getLocalStorage("auth")}`,
    },
    body: JSON.stringify(payload),
  });
  return result;
};
