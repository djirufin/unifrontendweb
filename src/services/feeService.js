import axios from "axios";
import { authHeader } from "./authHeader";

const ASSOCIATION_API_BASE_URL = "http://localhost:8080/fees";
const head = {
    'Content-Type': 'application/json'
}

export const getAutorisation = () => ([
    { id: 'local', title: 'Local' },
    { id: 'zone', title: 'Zone' },
    { id: 'region', title: 'Region' },
    { id: 'coordination', title: 'Coordination' }
])

export function insertFee(fee) {
    return axios.post(ASSOCIATION_API_BASE_URL, fee, {headers : authHeader(), head})
}

export function getAllFee() {
    return axios.get(ASSOCIATION_API_BASE_URL, {headers : authHeader(), head});
}

export function updateFee(feeId, fee) {
    return axios.put(ASSOCIATION_API_BASE_URL + '/' + feeId, fee, {headers : authHeader(), head})
}