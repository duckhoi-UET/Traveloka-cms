export const ROOM_STATUS = {
  READY: "1",
  FULL: "0",
};

export const ROOM_STATUS_OPTIONS = [
  {
    label: "Còn phòng",
    color: "green",
    value: ROOM_STATUS.READY,
  },
  {
    label: "Đã đặt",
    color: "danger",
    value: ROOM_STATUS.FULL,
  },
];

