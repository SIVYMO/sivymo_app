import API from "./APIScraping";

class ScrapingService {
    getPatentes(obj) {
        return API.post("/patentes", obj);
    }

    getMarcas(obj) {
        return API.post("marcas", obj);
    }
}
/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new ScrapingService();