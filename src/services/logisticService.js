/* eslint-disable no-unused-vars */
import axios from "axios";
import { authHeader } from "./authHeader";

const API_BASE_URL = "http://localhost:8084/api/public/logistics";
const head = {
    'Content-Type': 'application/json'
}

export function getMaterial() {
    return axios.get(API_BASE_URL + "/materials", {headers : authHeader(), head})
}

export function searchMaterial(searchBy, product) {
    return axios.get(API_BASE_URL+"/searchZrost?by=" + searchBy + "&product=" + product, {headers : authHeader(), head})
}

export function loadZrost(lzrost) {
    return axios.post(API_BASE_URL+"/zrost", {lzrost}, {headers : authHeader(), head})
}