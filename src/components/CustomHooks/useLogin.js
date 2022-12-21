export default function useLogin() {
    if (localStorage.key("userActive") !== null) {
        window.location = "/sivymo_app/inicio";
    }
}
