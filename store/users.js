import PAGINATION_CONFIG from '@/configs/pagination';

export const state = () => ({
    users: [],
    pagination: {},
});

export const getters = {
};

export const mutations = {
    SET_USERS(state, payload) {
        state.users = payload;
    },

    SET_HOUSEKEEPINGS(state, payload) {
        state.housekeepings = payload;
    },

    SET_PAGINATION(state, payload) {
        state.pagination = payload;
    },
};

export const actions = {
    async fetchAll({ commit }, { hotelId, query }) {
        const { data, recordsTotal } = await this.$api.users.getAll(hotelId, query);

        commit('SET_USERS', data);
        commit('SET_PAGINATION', {
            start: query?.start || 0,
            length: PAGINATION_CONFIG.PER_PAGE,
            recordsTotal,
        });
    },
};
