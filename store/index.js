export const state = () => ({
  isLoading: false,
});

export const mutations = {
  SET_LOADING(state, payload) {
    state.isLoading = payload;
  },
};

export const actions = {
  uploadImage({}, file) {
    return this.$axios.post("/upload-image", file);
  },
  setLoading({ commit }, payload) {
    commit("SET_LOADING", payload);
  },
};

