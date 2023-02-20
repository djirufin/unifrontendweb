import axios from "axios";
import { BASE_URL } from "./config";

const head = {
  headers: {
    "Content-Type": "application/json",
  },
};

export function login(username, password) {
  return axios
    .post(BASE_URL + "/auth/signin", { username, password }, { head })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("user"));
}
