import axios from "axios";
import { authHeader } from "./authHeader";

const ASSOCIATION_API_BASE_URL = "http://localhost:8080/users";
const head = {
    'Content-Type': 'application/json'
}

export const getAutorisation = () => ([
    { id: 'local', title: 'Local' },
    { id: 'zone', title: 'Zone' },
    { id: 'region', title: 'Region' },
    { id: 'coordination', title: 'Coordination' }
])


export function insertAdmin(user) {
    return axios.post(ASSOCIATION_API_BASE_URL, user, {headers : authHeader(), head})
}

export function getAllRegion() {
    return axios.get(ASSOCIATION_API_BASE_URL+"/regions", {headers : authHeader()});
}

export function getAllZone(name) {
    return axios.get(ASSOCIATION_API_BASE_URL+"/zones/"+name, {headers : authHeader()});
}

export function getAllLocal(name) {
    return axios.get(ASSOCIATION_API_BASE_URL+"/locales/"+name, {headers : authHeader()});
}

export function getAdminDisable() {
    return axios.get(ASSOCIATION_API_BASE_URL+"/disable", {headers : authHeader()});
}

export function updateAdmin(userId, user) {
    return axios.put(ASSOCIATION_API_BASE_URL + '/' + userId, user, {headers : authHeader(),head})
}

export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
}