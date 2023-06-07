export const state = () => ({
  detailBooking: null,
});

export const getters = {};

export const mutations = {
  SET_DETAIL_BOOKING(state, payload) {
    state.detailBooking = payload;
  },
};

export const actions = {
  createBooking({}, payload) {
    return this.$axios.post("/booking/create", payload);
  },
  getAll({}, params) {
    return this.$axios.get("/booking", { params });
  },
  async getDetail({ commit, dispatch }, params) {
    try {
      dispatch("setLoading", true, { root: true });
      const result = await this.$axios.get(`/booking/${params}`);
      if (result) {
        commit("SET_DETAIL_BOOKING", result.data.booking);
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch("setLoading", false, { root: true });
    }
  },
  deleteBooking({}, payload) {
    return this.$axios.delete(`/booking/${payload.id}`);
  },
  updateBooking({}, payload) {
    return this.$axios.patch(`/booking/${payload.id}`, payload.data);
  },
};

