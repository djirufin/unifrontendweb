/* eslint-disable no-unused-vars */
import axios from "axios";
import { authHeader } from "./authHeader";

const API_BASE_URL = "http://localhost:8080/api";
const head = {
  "Content-Type": "application/json",
};

export function sendEmail(to, subject, text, cc) {
  return axios.post(
    API_BASE_URL + "/auth/email",
    { to, subject, text, cc },
    { head }
  );
}
