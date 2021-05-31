import api from "./api";

class UsuarioService {
    resetPassword(email) {
        return api.put(`/reset-password/${email}`);
    }

    changePassword(email, oldPassword, newPassword) {
        return api.put(
            `/change-password/${email}/${oldPassword}/${newPassword}`
        );
    }

    login(obj) {
        return api.post("/login", obj);
    }

    getAll() {
        return api.get("/users");
    }

    getOne(id) {
        return api.get(`/users/${id}`);
    }

    insertOne(obj) {
        return api.post("/users", obj);
    }

    updateOne(obj) {
        return api.put("/users", obj);
    }

    removeOne(email) {
        return api.delete(`/users/${email}`);
    }
}

export default new UsuarioService();
