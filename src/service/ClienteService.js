import API from "./API";

class ClienteService {
    getAll() {
        return API.get("/clients");
    }

    insertAll(obj) {
        return API.post("/clientsAll", obj);
    }

    insertOne(obj) {
        return API.post("/clientsOne", obj);
    }

}
export default new ClienteService();