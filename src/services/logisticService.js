/* eslint-disable no-unused-vars */
import axios from "axios";
import { authHeader } from "./authHeader";

const API_BASE_URL = "http://localhost:8080/api";
const head = {
    'Content-Type': 'application/json'
}

export function getMaterial() {
    return axios.get(API_BASE_URL + "/public/logistics/materials", {headers : authHeader(), head})
}

export function searchMaterial(searchBy, product) {
    return axios.get(API_BASE_URL+"/public/logistics/searchZrost?by=" + searchBy + "&product=" + product, {headers : authHeader(), head})
}