export default (axios) => ({
    getProvinces: () => axios.get('/provinces').then((_) => _.data),
    getDistricts: (provinceId) => axios.get(`/provinces/${provinceId}/districts`).then((_) => _.data),
    getWards: (provinceId, districtId) => axios.get(`/provinces/${provinceId}/districts/${districtId}/wards`).then((_) => _.data),
});
