export const ROOM_STATUS = {
  INACTIVE: 0,
  ACTIVE: 1,
};

export const ROOM_STATUS_OPTIONS = [
  {
    label: "Còn phòng",
    color: "green",
    value: ROOM_STATUS.ACTIVE,
  },
  {
    label: "Đã đặt",
    color: "danger",
    value: ROOM_STATUS.INACTIVE,
  },
];

