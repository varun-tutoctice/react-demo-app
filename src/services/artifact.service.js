import http from "../http-common";

class ArtifactDataService {
  getAll() {
    return http.get("/attachment");
  }

  get(id) {
    return http.get(`/attachment/${id}`);
  }

  create(data) {
    console.log(data);
    return http.post("/attachment", data);
  }

  update(id, data) {
    return http.patch(`/attachment/${id}`, data);
  }

  delete(id) {
    return http.delete(`/attachment/${id}`);
  }

  deleteAll() {
    return http.delete(`/attachment`);
  }

  findByTitle(title) {
    console.log(title);
    return http.get(`/attachment?filter[where][title]=${title}`);
  }


  
}

export function isLoggedIn() {
  if (localStorage.getItem("labId")) {
    return true;
  }
}

export default new ArtifactDataService();