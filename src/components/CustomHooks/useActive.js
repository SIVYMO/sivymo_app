export default function useActive() {
     if (localStorage.key("userActive") === null) {
         window.location = "/sivymo_app";
     }
 }