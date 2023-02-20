import axios from "axios";
import { authHeader } from "./authHeader";
import { BASE_URL } from "./config";

const head = {
  "Content-Type": "application/json",
};

export const Role = () => [
  { id: "user", title: "User" },
  { id: "supplier", title: "User-Supplier" },
  { id: "mod", title: "Mod" },
  { id: "admin", title: "Admin" },
];

export function addUuser(user) {
  return axios.post(BASE_URL + "/auth/signup", user, {
    headers: authHeader(),
    head,
  });
}

export function listUsers() {
  return axios.get(BASE_URL + "/public/users", {
    headers: authHeader(),
  });
}

export function listSupply() {
  return axios.get(BASE_URL + "/public/allSupply", {
    headers: authHeader(),
  });
}

export function UserById(name) {
  return axios.get(BASE_URL + "/public/user/" + name, {
    headers: authHeader(),
  });
}

export function listUsersByOrg(id) {
  return axios.get(BASE_URL + "/public/users/organisation?id=" + id, {
    headers: authHeader(),
  });
}

export function updateUser(userId, user) {
  return axios.put(BASE_URL + "/public/user/" + userId, user, {
    headers: authHeader(),
    head,
  });
}

export function deleteuser(userId) {
  return axios.delete(BASE_URL + "/public/user/delete/" + userId, {
    headers: authHeader(),
    head,
  });
}

export function deletesupply(supplyId) {
  return axios.delete(BASE_URL + "/public/supply/delete/" + supplyId, {
    headers: authHeader(),
    head,
  });
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("user"));
}
