export default [{
    route: '/',
    label: 'Dashboard',
    icon: 'fas fa-home',
}, {
    route: '/user',
    label: 'Danh sách người dùng',
    icon: 'fas fa-user',
    childs: [{
        label: 'Menu 2',
        route: '/users',
    }],
}];
