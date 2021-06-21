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

    convertAPIDate(date){
        let tempDate = date.split("T")[0];
        return tempDate.replaceAll("-", "/");
    }

    convertInputDate(date){
        let tempDate = JSON.stringify(date);
        let cutDate = tempDate.substring(1, tempDate.length - 1);
        return this.convertAPIDate(cutDate)
    }

    convertOnlyInputDate(date){
        let tempDate = JSON.stringify(date);
        return tempDate.substring(1, tempDate.length - 1);
    }

    validateDateStartEnd(dateStart, dateEnd){
        if (
            dateStart.length === 10 &&
            dateEnd.length === 10 &&
            dateStart.split("/").length === 3 &&
            dateEnd.split("/").length === 3
        ) {
            return false;
        }
        return true;
    }


}

export default new Validations();
