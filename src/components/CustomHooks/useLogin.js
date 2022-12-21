export default function useLogin() {
    if (localStorage.getItem("userActive") !== null) {
        window.location = "/sivymo_app/#/inicio";
    }
}
