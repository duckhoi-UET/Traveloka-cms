export const BOOKING_STATUS = {
  REJECTED: "0",
  ACCEPTED: "1",
  PENDING: "2",
};

export const BOOKING_STATUS_OPTIONS = [
  {
    label: "Đã hủy",
    color: "red",
    value: BOOKING_STATUS.REJECTED,
  },
  {
    label: "Đã xác nhận",
    color: "green",
    value: BOOKING_STATUS.ACCEPTED,
  },
  {
    label: "Chờ xác nhận",
    color: "orange",
    value: BOOKING_STATUS.PENDING,
  },
];

export const BOOKING_MENU_TABLE = {
  DETAIL: "detail",
  ACCEPT: "accept",
  REJECT: "reject",
  DELETE: "delete",
};

