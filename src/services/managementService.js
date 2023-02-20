import axios from "axios";
import { authHeader } from "./authHeader";
import { BASE_URL } from "./config";

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
  return axios.get(BASE_URL + "/public/organisations/all", {
    headers: authHeader(),
    head,
  });
}

export function getOrgByType(type) {
  return axios.get(BASE_URL + "/public/organisations/type?type=" + type, {
    headers: authHeader(),
    head,
  });
}

export function addOrg(organisation) {
  return axios.post(BASE_URL, organisation, {
    headers: authHeader(),
    head,
  });
}

export function updateOrg(orgId, organisation) {
  return axios.put(BASE_URL + "/public/organisations/" + orgId, organisation, {
    headers: authHeader(),
    head,
  });
}

export function deleteOrg(orgId) {
  return axios.delete(BASE_URL + "/public/organisations/" + orgId, {
    headers: authHeader(),
    head,
  });
}
