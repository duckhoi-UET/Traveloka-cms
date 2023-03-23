export const USER_STATUS = {
    INACTIVE: 0,
    ACTIVE: 1,
};

export const USER_STATUS_OPTIONS = [{
    label: 'Hoạt động',
    color: 'green',
    value: USER_STATUS.ACTIVE,
}, {
    label: 'Không hoạt động',
    color: 'danger',
    value: USER_STATUS.INACTIVE,
}];
