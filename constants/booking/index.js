export const ROOM_STATUS = {
  REJECTED: "0",
  ACCEPTED: "1",
  PENDING: "2",
};

export const ROOM_STATUS_OPTIONS = [
  {
    label: "Đã hủy",
    color: "red",
    value: ROOM_STATUS.REJECTED,
  },
  {
    label: "Đã xác nhận",
    color: "green",
    value: ROOM_STATUS.ACCEPTED,
  },
  {
    label: "Chờ xác nhận",
    color: "orange",
    value: ROOM_STATUS.PENDING,
  },
];

