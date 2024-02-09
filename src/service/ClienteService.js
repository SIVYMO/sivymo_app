import API from "./API";

class ClienteService {

    getAll() {
        return API.get("/clients");
    }

    deleteBulk(obj) {
        return API.delete("/clients/bulk", {data: obj});
    }

    getAllRaw() {
        return API.get("/clientsRaw");
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