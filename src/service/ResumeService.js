import API from './API'

class ResumeService{
     getResume(){
          return API.get("/resume")
     }
}
/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new ResumeService();