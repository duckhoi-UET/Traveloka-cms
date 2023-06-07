export const state = () => ({
  detailRoom: null,
});

export const mutations = {
  SET_DETAIL_ROOM(state, payload) {
    state.detailRoom = payload;
  },
};

export const actions = {
  getAllRooms({}, params) {
    return this.$axios.get("/rooms", { params });
  },
  createRoom({}, payload) {
    return this.$axios.post("/rooms/create", payload);
  },
  deleteRoom({}, payload) {
    return this.$axios.delete(`/rooms/${payload.id}`);
  },
  async getDetailRoom({ commit, dispatch }, payload) {
    try {
      dispatch("setLoading", true, { root: true });
      const response = await this.$axios.get(`/rooms/${payload}`);
      if (response) {
        commit("SET_DETAIL_ROOM", response.data.room);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch("setLoading", false, { root: true });
    }
  },
  updateRoom({}, payload) {
    return this.$axios.patch(`/rooms/${payload.id}`, payload.data);
  },
};

