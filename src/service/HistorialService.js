import API from "./API";

class HistorialService {
    insertOne(type) {
        return API.post(`/history/${type}`);
    }
}

export default new HistorialService();
