import axios from "axios";

export default axios.create({
    baseURL: "https://sivymoapi.herokuapp.com/novopatent-api",
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
});
