import PAGINATION_CONFIG from "@/configs/pagination";

export const state = () => ({
  booking: [
    {
      id: 1,
      fullName: "Nguyễn Đức Khôi",
      numberCard: "1234567890",
      phone: "0987654321",
      email: "khoi@gmail.com",
      createTime: "18/05/2023",
    },
    {
      id: 2,
      fullName: "Nguyễn Đức Khôi",
      numberCard: "1234567890",
      phone: "0987654321",
      email: "khoi@gmail.com",
      createTime: "18/05/2023",
    },
    {
      id: 3,
      fullName: "Nguyễn Đức Khôi",
      numberCard: "1234567890",
      phone: "0987654321",
      email: "khoi@gmail.com",
      createTime: "18/05/2023",
    },
    {
      id: 4,
      fullName: "Nguyễn Đức Khôi",
      numberCard: "1234567890",
      phone: "0987654321",
      email: "khoi@gmail.com",
      createTime: "18/05/2023",
    },
  ],
  pagination: {
    start: 1,
    recordsTotal: 10,
    page: 10,
  },
});

export const getters = {};

export const mutations = {};

export const actions = {};
