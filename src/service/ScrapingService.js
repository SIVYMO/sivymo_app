import api from "./apiScraping";

class ScrapingService {
    getPatentes(obj) {
        return api.post("/patentes", obj);
    }

    getMarcas(obj) {
        return api.post("marcas", obj);
    }
}

export default new ScrapingService();