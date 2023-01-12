/* eslint-disable no-unused-vars */
import axios from "axios";
import { authHeader } from "./authHeader";

const API_BASE_URL = "http://localhost:8080/api";
const head = {
  "Content-Type": "application/json",
};

export function materialIP(consignee) {
  return axios.get(
    API_BASE_URL + "/public/logistics/materialIP?consignee=" + consignee,
    {
      headers: authHeader(),
      head,
    }
  );
}

export function getMaterial() {
  return axios.get(API_BASE_URL + "/public/logistics/materials", {
    headers: authHeader(),
    head,
  });
}

export function loadZrost(lzrost) {
  return axios.post(
    API_BASE_URL + "/public/logistics/zrost",
    { lzrost },
    { headers: authHeader(), head }
  );
}

export function acknowledge(consignee, pickstatus) {
  return axios.get(
    API_BASE_URL +
      "/public/logistics/acknowledge?consignee=" +
      consignee +
      "&pickstatus=" +
      pickstatus,
    { headers: authHeader(), head }
  );
}

export function traceProduct(batch) {
  return axios.get(API_BASE_URL + "/public/logistics/trace?batch=" + batch, {
    headers: authHeader(),
    head,
  });
}

export function tracerList(alert) {
  return axios.get(
    API_BASE_URL + "/public/logistics/tracerList?alert=" + alert,
    {
      headers: authHeader(),
      head,
    }
  );
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

export function transferMaterial(
  source,
  waybill,
  supplier,
  driver,
  ip_spoc,
  mlleVehicule,
  phoneDriver
) {
  return axios.get(
    API_BASE_URL +
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
      phoneDriver,
    { headers: authHeader(), head }
  );
}

export function tracerFound(batch, consigneeTracer, phoneTracer, emailTracer) {
  return axios.get(
    API_BASE_URL +
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
