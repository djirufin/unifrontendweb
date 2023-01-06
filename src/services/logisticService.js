/* eslint-disable no-unused-vars */
import axios from "axios";
import { authHeader } from "./authHeader";

const API_BASE_URL = "http://localhost:8080/api";
const head = {
  "Content-Type": "application/json",
};

export function getMaterial() {
  return axios.get(API_BASE_URL + "/public/logistics/materials", {
    headers: authHeader(),
    head,
  });
}

export function loadZrost(lzrost) {
  return axios.post(API_BASE_URL+"/zrost", {lzrost}, {headers : authHeader(), head})
}

export function searchMaterial(searchBy, product) {
  return axios.get(
    API_BASE_URL +
      "/public/logistics/searchZrost?by=" +
      searchBy +
      "&product=" +
      product,
    { headers: authHeader(), head }
  );
}

export function transferMaterial(source, id, supplier, driver, ip_spoc) {
  return axios.get(
    API_BASE_URL +
      "/public/logistics/transfer?source=" +
      source +
      "&id=" +
      id +
      "&supplier=" +
      supplier +
      "&driver=" +
      driver +
      "&ipspoc=" +
      ip_spoc,
    { headers: authHeader(), head }
  );
}
