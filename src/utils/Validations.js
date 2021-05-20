/* eslint-disable no-useless-escape */
const CHARS =
    "áéíóúÁÉÍÓÚabcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ ";
class Validations {
    validateEmail(email) {
        const re =
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    validateNames(name) {
        let flag = true;
          if(name!==""){
               for (let i = 0; i < name.length; i++) {
                    if (CHARS.indexOf(name.charAt(i)) === -1) {
                        flag = false;
                        break;
                    }
                }
          }else{
               return false;
          }
        return flag;
    }

    validateSecondSurname(surname) {
        if (surname === "") {
            return true;
        } else {
            return this.validateNames(surname);
        }
    }
}

export default new Validations();
