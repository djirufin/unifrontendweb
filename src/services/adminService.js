import axios from "axios";
import { authHeader } from "./authHeader";

const TRANSFER_API_BASE_URL = "http://localhost:8080/transfer";
const head = {
    'Content-Type': 'application/json'
}

export const getAutorisation = () => ([
    { id: 'local', title: 'Local' },
    { id: 'zone', title: 'Zone' },
    { id: 'region', title: 'Region' },
    { id: 'coordination', title: 'Coordination' }
])

export const searchBy = () => ([
    { id: 'waybill_number', title: 'WayBill' },
    { id: 'material_name', title: 'Material Name' },
    { id: 'reference_material', title: 'Reference Material' }
])

export function getAllTransfer() {
    return axios.get(TRANSFER_API_BASE_URL+"/getAll", {headers : authHeader()})
}


export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
}