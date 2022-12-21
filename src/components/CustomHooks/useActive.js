export default function useActive() {
     if (localStorage.getItem("userActive") === null) {
         window.location = "/sivymo_app/#/";
     }
 }