import axios from "axios";
import { authHeader } from "./authHeader";

const API_BASE_URL = "http://localhost:8080/api/public/organisations";
const head = {
  "Content-Type": "application/json",
};

export const Type = () => [
  { id: "INTERN", title: "INTERN" },
  { id: "SUPPLIER", title: "SUPPLIER" },
  { id: "IPARTNER", title: "IPARTNER" },
  { id: "UNDEFINED", title: "UNDEFINED" },
];

export function getOrganisation() {
  return axios.get(API_BASE_URL + "/all", { headers: authHeader(), head });
}

export function getOrgByType(type) {
  return axios.get(API_BASE_URL + "/type?type=" + type, {
    headers: authHeader(),
    head,
  });
}
