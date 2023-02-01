/* eslint-disable no-unused-vars */
import axios from "axios";
import { authHeader } from "./authHeader";

const API_BASE_URL = "http://localhost:8080/api";
const head = {
  "Content-Type": "application/json",
};

export const activity = () => [
  {
    value: "Construction Civil engeneering, buildling, watsan",
    label: "Construction Civil engeneering, buildling, watsan",
  },
  { value: "Janitorial & Fumigation", label: "Janitorial & Fumigation" },
  { value: "Building maintenance", label: "Building maintenance" },
  { value: "Catering & Events", label: "Catering & Events" },
  { value: "Drilling boreholes", label: "Drilling boreholes" },
  { value: "Courier", label: "Courier" },
  { value: "Media & Communication", label: "Media & Communication" },
  { value: "Fire extinguisher", label: "Fire extinguisher" },
  { value: "Metal and carpentry works", label: "Metal and carpentry works" },
  {
    value: "Hotel Conference, Accomodation",
    label: "Hotel Confeerence, Accomodation",
  },
  {
    value: "Logistics Storage, transport, forwarding agent",
    label: "Logistics Storage, transport, forwarding agent",
  },
  {
    value: "Security Guard & Access control",
    label: "Security Guard & Access control",
  },
  { value: "Printing", label: "Printing" },
  { value: "Vehicule rental", label: "Vehicule rental" },
  {
    value: "Vehicule servicing & Spare parts",
    label: "Vehicule servicing & SPare parts",
  },
  { value: "Travel agency", label: "Travel agency" },
  {
    value: "Translation & Interpretation",
    label: "Translation & Interpretation",
  },
  {
    value: "Technical consulting & Training",
    label: "Technical consulting & Training",
  },
  {
    value: "Air conditioner Equipement & services",
    label: "Air conditioner Equipement & services",
  },
  {
    value: "Audiovisual & Household appliance",
    label: "Audiovisual & Household appliance",
  },
  {
    value: "Clothes, Sport & Play supplies",
    label: "Clothes, Sport & Play supplies",
  },
  {
    value: "Construction materials & Hardware",
    label: "Construction materials & Hardware",
  },
  { value: "Emergency supplies", label: "Emergency supplies" },
  { value: "General market", label: "General market" },
  {
    value: "Household and office furniture",
    label: "Household and office furniture",
  },
  { value: "ITC Equipement & services", label: "ITC Equipement & services" },
  {
    value: "Paramedic & Medical supplies",
    label: "Paramedic & Medical supplies",
  },
  {
    value: "Petroleum & Chemical product",
    label: "Petroleum & Chemical product",
  },
  {
    value: "Power generating Solar & generator, Asset & maintenance",
    label: "Power generating Solar & generator, Asset & maintenance",
  },
  {
    value: "School and office stationery & supplies",
    label: "School and office stationery & supplies",
  },
  {
    value: "Transport equipement Vehicule and Motorcycles",
    label: "Transport equipement Vehicule and Motorcycles",
  },
];

export function sendEmail(to, subject, text, cc) {
  return axios.post(
    API_BASE_URL + "/auth/email",
    { to, subject, text, cc },
    { head }
  );
}

export function supplier(supply) {
  return axios.post(API_BASE_URL + "/auth/supplier", supply, { head });
}
