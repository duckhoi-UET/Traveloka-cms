export const state = () => ({
  isLoading: false,
  listRoomSelect: [],
});

export const mutations = {
  SET_LOADING(state, payload) {
    state.isLoading = payload;
  },
  SET_LIST_ROOM_SELECT(state, payload) {
    state.listRoomSelect = payload;
  },
};

export const actions = {
  uploadImage({}, file) {
    return this.$axios.post("/upload-image", file);
  },
  setLoading({ commit }, payload) {
    commit("SET_LOADING", payload);
  },
  async getListRoomSelect({ commit, dispatch }) {
    try {
      dispatch("setLoading", true);
      const response = await this.$axios.get("/selections/rooms");
      if (response) {
        commit("SET_LIST_ROOM_SELECT", response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch("setLoading", false);
    }
  },
};
