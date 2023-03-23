export default (axios) => ({
    getMenuItems: () => axios.get('/user/menus').then((_) => _.data),
    updateProfile: (data) => axios.post('/user/update_profile', data).then((_) => _.data),
    updatePassword: (data) => axios.post('/user/change_password', data).then((_) => _.data),
});
