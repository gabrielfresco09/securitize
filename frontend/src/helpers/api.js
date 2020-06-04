import axios from "axios";

export const getCurrencies = queryParams =>
  axios.get("http://localhost:3001/currencies", {
    params: { ...queryParams }
  });
