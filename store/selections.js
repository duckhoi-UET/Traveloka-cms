export const state = () => ({
    provinces: [],
    districts: [],
    wards: [],
});

export const getters = {
};

export const mutations = {
    SET_STATE(state, { prop, data }) {
        state[prop] = data;
    },
};

export const actions = {
    async fetchProvinces({ commit, state }) {
        if (!state.provinces?.length) {
            const { data } = await this.$api.selections.getProvinces();

            commit('SET_STATE', { prop: 'provinces', data });
        }
    },

    async fetchDistricts({ commit }, { provinceId }) {
        const { data } = await this.$api.selections.getDistricts(provinceId);

        commit('SET_STATE', { prop: 'districts', data });
    },

    async fetchWards({ commit }, { provinceId, districtId }) {
        const { data } = await this.$api.selections.getWards(provinceId, districtId);

        commit('SET_STATE', { prop: 'wards', data });
    },
};
