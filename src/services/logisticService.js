/* eslint-disable no-unused-vars */
import axios from "axios";
import { authHeader } from "./authHeader";
import { BASE_URL } from "./config";

const head = {
  "Content-Type": "application/json",
};

export function materialIP(consignee) {
  return axios.get(
    BASE_URL + "/public/logistics/materialIP?consignee=" + consignee,
    {
      headers: authHeader(),
      head,
    }
  );
}

export function getMaterial() {
  return axios.get(BASE_URL + "/public/logistics/materials", {
    headers: authHeader(),
    head,
  });
}

export function loadZrost(lzrost) {
  return axios.post(
    BASE_URL + "/public/logistics/zrost",
    { lzrost: lzrost },
    { headers: authHeader(), head }
  );
}

export function loadDdel(lddel) {
  return axios.post(
    BASE_URL + "/public/logistics/ddel",
    { lddel: lddel },
    { headers: authHeader(), head }
  );
}

export function acknowledge(consignee, pickstatus) {
  return axios.get(
    BASE_URL +
      "/public/logistics/acknowledge?consignee=" +
      consignee +
      "&pickstatus=" +
      pickstatus,
    { headers: authHeader(), head }
  );
}

export function traceProduct(batch) {
  return axios.get(BASE_URL + "/public/logistics/trace?batch=" + batch, {
    headers: authHeader(),
    head,
  });
}

export function tracerList(alert) {
  return axios.get(BASE_URL + "/public/logistics/tracerList?alert=" + alert, {
    headers: authHeader(),
    head,
  });
}

export function updateBeneficiary(dispatchId, endBeneficiary) {
  return axios.put(
    BASE_URL + "/public/logistics/updateBeneficiary?id=" + dispatchId,
    endBeneficiary,
    {
      headers: authHeader(),
      head,
    }
  );
}

export function issuesList(alert) {
  return axios.get(BASE_URL + "/public/logistics/issues?alert=" + alert, {
    headers: authHeader(),
    head,
  });
}

export function inventoryList(status) {
  return axios.get(BASE_URL + "/public/logistics/inventory?status=" + status, {
    headers: authHeader(),
    head,
  });
}

export function searchZrost(searchBy, product) {
  return axios.get(
    BASE_URL +
      "/public/logistics/searchZrost?by=" +
      searchBy +
      "&product=" +
      product,
    { headers: authHeader(), head }
  );
}

export function searchDdel(searchBy, product) {
  return axios.get(
    BASE_URL +
      "/public/logistics/searchDdel?by=" +
      searchBy +
      "&product=" +
      product,
    { headers: authHeader(), head }
  );
}

export function transferMaterial(
  source,
  waybill,
  supplier,
  driver,
  ip_spoc,
  mlleVehicule,
  phoneDriver,
  senderName,
  senderPhone,
  senderEmail,
  consignee,
  consigneeName
) {
  return axios.get(
    BASE_URL +
      "/public/logistics/transfer?source=" +
      source +
      "&waybill=" +
      waybill +
      "&supplier=" +
      supplier +
      "&driver=" +
      driver +
      "&ipspoc=" +
      ip_spoc +
      "&mlleVehicule=" +
      mlleVehicule +
      "&phoneDriver=" +
      phoneDriver +
      "&senderName=" +
      senderName +
      "&senderPhone=" +
      senderPhone +
      "&senderEmail=" +
      senderEmail +
      "&consignee=" +
      consignee +
      "&consigneeName=" +
      consigneeName,
    { headers: authHeader(), head }
  );
}

export function tracerFound(batch, consigneeTracer, phoneTracer, emailTracer) {
  return axios.get(
    BASE_URL +
      "/public/logistics/tracer?batch=" +
      batch +
      "&consigneeTracer=" +
      consigneeTracer +
      "&phoneTracer=" +
      phoneTracer +
      "&emailTracer=" +
      emailTracer,
    { headers: authHeader(), head }
  );
}

export function dispatchMaterial(dispatch) {
  return axios.post(BASE_URL + "/public/logistics/dispatch", dispatch, {
    headers: authHeader(),
    head,
  });
}

export function listDispatch(senderEmail) {
  return axios.get(
    BASE_URL + "/public/logistics/listDispatch?senderEmail=" + senderEmail,
    {
      headers: authHeader(),
      head,
    }
  );
}
