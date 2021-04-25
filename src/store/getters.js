export default {
  isAuthenticated(state) {
    return !!state.auth.bearer;
  },
};
