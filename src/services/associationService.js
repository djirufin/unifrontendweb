import axios from "axios";
import { authHeader } from "./authHeader";

const ASSOCIATION_API_BASE_URL = "http://localhost:8080/associations";
const API_BASE_URL = "http://localhost:8080/users";
const head = {
    'Content-Type': 'application/json'
}

export const getDepartmentCollection = () => ([
    { id: 'PEMIRTIR', title: 'Pemirtir' },
    { id: 'DESATIVAR', title: 'Desativar' }
])

export function insertAssociation(association) {
    return (
        axios.post(ASSOCIATION_API_BASE_URL, association, {headers : authHeader(), head}),
        axios.post(API_BASE_URL, association, {headers : authHeader(), head})
    )
}

export function updateAssociation(associationId, association) {
    return (
        axios.put(ASSOCIATION_API_BASE_URL + '/' + associationId, association, {headers : authHeader(), head}),
        axios.put(API_BASE_URL + '/' + associationId, association, {headers : authHeader(),head})
    )
}

export function getAllAssociation() {
   return axios.get(ASSOCIATION_API_BASE_URL, {headers : authHeader(), head});
}

export function getAssociationDisable() {
    return axios.get(ASSOCIATION_API_BASE_URL+"/disable", {headers : authHeader(), head});
}

export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
}