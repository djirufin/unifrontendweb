import axios from "axios";
import { authHeader } from "./authHeader";
import { BASE_URL } from "./config";

const head = {
  "Content-Type": "application/json",
};

export function pmvList() {
  return axios.get(BASE_URL + "/public/monitoring/pmvList", {
    headers: authHeader(),
    head,
  });
}

export function eumList() {
  return axios.get(BASE_URL + "/public/monitoring/eumList", {
    headers: authHeader(),
    head,
  });
}

export function smList() {
  return axios.get(BASE_URL + "/public/monitoring/eum/listSM", {
    headers: authHeader(),
    head,
  });
}

export function crlList() {
  return axios.get(BASE_URL + "/public/monitoring/eum/listCRL", {
    headers: authHeader(),
    head,
  });
}

export function pcList() {
  return axios.get(BASE_URL + "/public/monitoring/eum/listPC", {
    headers: authHeader(),
    head,
  });
}

export function updatePmv(id, pmv) {
  return axios.put(BASE_URL + "/public/monitoring/pmv/update/" + id, pmv, {
    headers: authHeader(),
    head,
  });
}

export function deletePmv(id) {
  return axios.delete(BASE_URL + "/public/monitoring/pmv/delete/" + id, {
    headers: authHeader(),
    head,
  });
}
