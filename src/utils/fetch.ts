export const fetchAPI = async (url: string, options: RequestInit) => {
  const response = await fetch(url, {
    headers: {
      "content-type": "application/json",
    },
    ...options,
  });
  const data = await response.json();
  return data;
};
