import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";
const head = {
    headers : {
        'Content-Type': 'application/json'
    }
}

export function login(username, password) {
    return axios
        .post(API_URL + "signin", {username, password}, {head})
        .then(response => {
            if(response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data))
            }
            return response.data;
            
        });
}

export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
}