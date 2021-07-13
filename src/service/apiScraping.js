import axios from "axios";

export default axios.create({
    baseURL: "http://40.122.50.129:8081",
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
});
