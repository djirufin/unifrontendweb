import axios from "axios";
import { authHeader } from "./authHeader";

const ASSOCIATION_API_BASE_URL = "http://localhost:8080/paiements";
const head = {
    'Content-Type': 'application/json'
}

export const getStatus = () => ([
    { id: 'PEMIRTIR', title: 'Pemirtir' },
    { id: 'DESATIVAR', title: 'Desativar' }
])


export function insertMembre(membre) {
    return axios.post(ASSOCIATION_API_BASE_URL, membre, {headers : authHeader(), head})
}
//COODINATION
export function getAllMembre() {
    return axios.get(ASSOCIATION_API_BASE_URL, {headers : authHeader(), head});
}
//ZONE
export function getMembre(mlle) {
    return axios.get(ASSOCIATION_API_BASE_URL+ "/zone/"+mlle, {headers : authHeader(), head});
}

export function getSumMembre(mlle) {
    return axios.get(ASSOCIATION_API_BASE_URL +"/sum/"+mlle, {headers : authHeader(), head})
    
}

export function getSum() {
    return axios.get(ASSOCIATION_API_BASE_URL +"/sum", {headers : authHeader(), head})
    
}

export function getMembreDisable() {
    return axios.get(ASSOCIATION_API_BASE_URL+"/disable", {headers : authHeader(), head});
}

export function updateMembre(membreId, membre) {
    return axios.put(ASSOCIATION_API_BASE_URL + '/' + membreId, membre, {headers : authHeader(), head})
}

export function updateChecked(membreId, membre) {
    return axios.put(ASSOCIATION_API_BASE_URL + '/updateChecked/' + membreId, membre, {headers : authHeader(), head})
}

export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
}