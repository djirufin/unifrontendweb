import axios from "axios";
import { authHeader } from "./authHeader";

const ASSOCIATION_API_BASE_URL = "http://localhost:8080/api/public";
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

export function listUsers() {
    return axios.get(ASSOCIATION_API_BASE_URL+"/users", {headers : authHeader()});
}

export function updateAdmin(userId, user) {
    return axios.put(ASSOCIATION_API_BASE_URL + '/' + userId, user, {headers : authHeader(),head})
}

export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
}