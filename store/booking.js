import PAGINATION_CONFIG from "@/configs/pagination";

export const state = () => ({
  booking: [],
  pagination: {
    start: 1,
    recordsTotal: 45,
    page: 1,
    length: 10,
  },
});

export const getters = {};

export const mutations = {
  SET_BOOKING(state, data) {
    state.booking = [...data];
  },
};

export const actions = {
  setBooking({ commit }, data) {
    commit("SET_BOOKING", data);
  },
};
