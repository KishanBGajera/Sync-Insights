import axios from "axios";
import { BASE_URI, apiKeys } from "./apiKeys";

axios.create({
  baseURL: BASE_URI,
  headers: {
    "Content-Type": "application/json",
    'Accept': 'application/json'

  },

});

// eslint-disable-next-line no-undef
export const loginUser = (data) => axios.post(apiKeys.login, data);
export const InsertUser = (data) => axios.post(apiKeys.insert_user, data);