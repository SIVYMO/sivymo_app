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
/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new ClienteService();