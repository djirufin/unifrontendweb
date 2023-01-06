import axios from "axios";
import { authHeader } from "./authHeader";

const ASSOCIATION_API_BASE_URL = "http://localhost:8080/api";
const head = {
    'Content-Type': 'application/json'
}

export const Role = () => ([
    { id: 'user', title: 'User' },
    { id: 'mod', title: 'Mod' },
    { id: 'admin', title: 'Admin' },
])


export function addUuser(user) {
    return axios.post(ASSOCIATION_API_BASE_URL+"/auth/signup", user, {headers : authHeader(), head})
}

export function listUsers() {
    return axios.get(ASSOCIATION_API_BASE_URL+"/public/users", {headers : authHeader()});
}

export function listUsersByOrg(id) {
    return axios.get(ASSOCIATION_API_BASE_URL + "/public/users/organisation?id=" + id, {
      headers: authHeader(),
    });
}

export function updateAdmin(userId, user) {
    return axios.put(ASSOCIATION_API_BASE_URL + '/' + userId, user, {headers : authHeader(),head})
}

export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
}