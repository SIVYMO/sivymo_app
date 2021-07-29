import api from "./api";

class ClienteService {
     getAll(){
          return api.get("/clients");
     }

     insertOne(obj){
          return api.post("/clientsOne", obj);
     }

     insertTwo(obj){
          return api.post("/clientsTwo", obj);
     }

     removeAll(){
          return api.delete("/clients")
     }
}

export default new ClienteService();
