export default {
  user(state, user) {
    Object.assign(state.auth, { user });
  },
  bearer(state, bearer) {
    Object.assign(state.auth, { bearer });
  },
  books(state, books) {
    state.books = Array.from(books);
  },
  currentBook(state, currentBook) {
    Object.assign(state.currentBook, currentBook);
  },
  totalBooks(state, totalBooks) {
    state.totalBooks = totalBooks;
  },
};
