/* eslint-disable no-unused-vars */
import axios from "axios";
import { authHeader } from "./authHeader";

const API_BASE_URL = "https://www.digitale-it.com/unicef/api";
const head = {
  "Content-Type": "application/json",
};

export function sendEmail(to, subject, text) {
  return axios.post(
    API_BASE_URL + "/auth/email",
    { to, subject, text },
    { head }
  );
}
