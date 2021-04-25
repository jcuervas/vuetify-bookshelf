import axios from "axios";
import store from "@/store";

const apiUrl = "http://localhost:3000";
const booksApi = "https://demo.api-platform.com";

export const apiEndPoints = {
  login: apiUrl + "/api/auth/login/",
  books: booksApi + "/books",
  review: booksApi + "/review",
};
class ApiService {
  async signInWithEmailAndPassword(username, password) {
    const body = { username, password };

    const signInResponse = await this.post(apiEndPoints.login, body);
    const { user, token } = signInResponse.data;
    store.commit("user", user);
    store.commit("bearer", "Bearer " + token);
    return null;
  }

  get(url, options) {
    return axios.get(url, options);
  }

  post(url, data, options) {
    return axios.post(url, data, options);
  }
}

export default new ApiService();
