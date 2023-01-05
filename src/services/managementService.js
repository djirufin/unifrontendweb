import axios from "axios";
import { authHeader } from "./authHeader";

const API_BASE_URL = "http://localhost:8084/api/public/organisations";
const head = {
    'Content-Type': 'application/json'
}

export function getOrganisation() {
    return axios.get(API_BASE_URL+"/all", {headers : authHeader(), head})
}

export function getOrgByType(type) {
    return axios.get(API_BASE_URL+"/type?type="+type, {headers : authHeader(), head})
}