export default [
  {
    route: "/",
    label: "Dashboard",
    icon: "fas fa-home",
    childs: [],
  },
  {
    route: "/banner",
    label: "Quản lý banner",
    icon: "fas fa-laptop-medical",
    childs: [],
  },
  {
    route: "/booking",
    label: "Danh sách đặt phòng",
    icon: "fas fa-money-check",
    childs: [],
  },
  {
    route: "/hotel-manager",
    label: "Quản khách sạn",
    icon: "fas fa-hotel",
    childs: [
      {
        route: "/rooms",
        label: "Quản lý phòng",
        icon: "fas fa-door-open",
      },
      {
        route: "/users",
        label: "Quản lý khách hàng",
        icon: "fas fa-user",
      },
    ],
  },
];

