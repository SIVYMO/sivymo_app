import API from './API'

class ResumeService{
     getResume(){
          return API.get("/resume")
     }
}

export default new ResumeService();