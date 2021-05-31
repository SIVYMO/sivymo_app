import api from "./api";

class ClienteService {
     getAll(){
          return api.get("/clients");
     }

     insertAll(obj){
          return api.post("/clients", obj);
     }

     removeAll(){
          return api.delete("/clients")
     }
}

export default new ClienteService();
