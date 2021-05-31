import api from "./api";

class HistorialService {
    insertOne(type) {
        return api.post(`/history/${type}`);
    }
}

export default new HistorialService();
