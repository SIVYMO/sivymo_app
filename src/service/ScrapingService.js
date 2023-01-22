import API from "./APIScraping";

class ScrapingService {
    getPatentes(obj) {
        return API.post("/patentes", obj);
    }

    getMarcas(obj) {
        return API.post("marcas", obj);
    }
}

export default new ScrapingService();