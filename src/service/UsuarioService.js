import API from "./API";

class UsuarioService {
    resetPassword(email) {
        return API.put(`/reset-password/${email}`);
    }

    changePassword(email, oldPassword, newPassword) {
        return API.put(
            `/change-password/${email}/${oldPassword}/${newPassword}`
        );
    }

    login(obj) {
        return API.post("/login", obj);
    }

    getAll() {
        return API.get("/users");
    }

    getOne(id) {
        return API.get(`/users/${id}`);
    }

    insertOne(obj) {
        return API.post("/users", obj);
    }

    updateOne(obj) {
        return API.put("/users", obj);
    }

    removeOne(email) {
        return API.delete(`/users/${email}`);
    }
}
/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new UsuarioService();
