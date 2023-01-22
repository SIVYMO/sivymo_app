import axios from "axios";
import {API_SCRAPING_URL} from "./Endpoints";

export default axios.create({
    baseURL: API_SCRAPING_URL,
    headers: {"Content-type": "application/json",},
});
