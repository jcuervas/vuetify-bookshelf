import apiService, { apiEndPoints } from "@/services/apiService";

export default {
  login(context, { username, password }) {
    return apiService.signInWithEmailAndPassword(username, password);
  },
  logout(context) {
    context.commit("user", null);
    context.commit("bearer", null);
  },
  async getBooks(context, params) {
    const results = await apiService.get(apiEndPoints.books, { params });
    const books = results.data["hydra:member"];
    context.commit("books", books);
    context.commit("totalBooks", results.data["hydra:totalItems"]);
  },
  async getBook(context, id) {
    const result = await apiService.get(apiEndPoints.books + "/" + id);
    context.commit("currentBook", result.data);
  },
  postBook(context, book) {
    return apiService.post(apiEndPoints.books, book);
  },
  editBook(context, book) {
    context.commit("currentBook", book);
  },
  async isValidBookValue(context, { key, value }) {
    const response = await apiService.get(apiEndPoints.books, {
      params: { [key]: value },
    });
    const match = response.data["hydra:member"].find((book) => {
      return book[key] === value;
    });
    return !match;
  },
};
