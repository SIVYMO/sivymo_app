
export default function useLogin() {
    if (localStorage.key("userActive") !== null) {
        window.location = "/inicio";
    }
}
