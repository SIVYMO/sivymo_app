import api from './api'

class ResumeService{
     getResume(){
          return api.get("/resume")
     }
}

export default new ResumeService();