export default (axios) => ({
    getAll: (params) => axios.get('/users/all', { params }).then((_) => _.data),
    getDetail: (userId) => axios.get(`/users/${userId}`).then((_) => _.data),
    create: (data) => axios.post('/users', data).then((_) => _.data),
    update: (userId, data) => axios.put(`/users/${userId}`, data).then((_) => _.data),
    delete: (userId) => axios.delete(`/users/${userId}`).then((_) => _.data),
    toggleStatus: (userId) => axios.put(`/users/${userId}/toogle_status`).then((_) => _.data),
});
