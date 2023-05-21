import PAGINATION_CONFIG from "@/configs/pagination";

export const state = () => ({
  booking: [],
  listBookingConst: [],
  pagination: {
    start: 1,
    recordsTotal: 60,
    page: 1,
    length: 10,
  },
});

export const getters = {};

export const mutations = {
  SET_BOOKING(state, data) {
    state.booking = [...data];
  },
  SET_BOOKING_CONST(state, data) {
    state.listBookingConst = [...data];
  },
};

export const actions = {
  setBooking({ commit }, data) {
    commit("SET_BOOKING", data);
    commit("SET_BOOKING_CONST", data);
  },
  filter({ commit, state }, data) {
    if (data) {
      const { from, to } = data;
      let list = state.listBookingConst;
      list = list.filter((value) => {
        if (
          new Date(value.createTime) >= new Date(from) &&
          new Date(value.createTime) <= new Date(to)
        )
          return true;
      });
      commit("SET_BOOKING", list);
    } else {
      let list = state.listBookingConst;
      commit("SET_BOOKING", list);
    }
  },
};
