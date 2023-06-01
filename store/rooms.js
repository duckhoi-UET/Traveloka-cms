export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  getAllRooms({}, params) {
    return this.$axios.get("/rooms", { params });
  },
  createRoom({}, payload) {
    return this.$axios.post("/rooms/create", payload);
  },
};

