import API from "./API";

class HistorialService {
    insertOne(type) {
        return API.post(`/history/${type}`);
    }
}
/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new HistorialService();
