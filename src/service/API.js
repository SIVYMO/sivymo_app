import axios from "axios";
import {API_BACKEND_URL} from "./Endpoints";

const AXIOS = axios.create({
    baseURL: API_BACKEND_URL,
    headers: {"Content-type": "application/json"},
})
export default AXIOS
