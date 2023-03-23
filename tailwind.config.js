// Default config here: https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/defaultConfig.stub.js

const colors = require("tailwindcss/colors");

module.exports = {
  content: [],
  safelist: [
    {
      pattern: /bg-(prim|blue|orange|red|yellow|gray|green)-100/,
    },
    {
      pattern: /border-(prim|blue|orange|red|yellow|gray|green)-100/,
    },
    "bg-yellow-100",
  ],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "0px 1px 0px #D7DAE7",
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      prim: {
        100: "#07209F",
        90: "#2ea1ff",
        40: "#A3AED2",
        10: "#E9EBF4",
        5: "#F3F5F9",
      },
      primary: {
        100: "#409EFF",
        80: "#66B1FF",
        60: "#A0CFFF",
        40: "#B3D8FF",
        20: "#D9ECFF",
        10: "#ECF5FF",
      },
      link: {
        100: "#3366FF",
      },
      orange: {
        100: "#FF6400",
      },
      green: {
        100: "#00A96C",
      },
      red: {
        100: "#E82727",
      },
      blue: {
        100: "#2EA1FF",
        60: "#365899",
      },
      yellow: {
        100: "#F8B425",
      },
      success: {
        100: "#67C23A",
        80: "#85CE61",
        60: "#B3E19D",
        40: "#C2E7B0",
        20: "#E1F3D8",
        10: "#F0F9EB",
      },
      warning: {
        100: "#E6A23C",
        80: "#EBB563",
        60: "#F3D19E",
        40: "#F5DAB1",
        20: "#FAECD8",
        10: "#FDF6EC",
      },
      danger: {
        100: "#F56C6C",
        80: "#F78989",
        60: "#FAB6B6",
        40: "#FBC4C4",
        20: "#FDE2E2",
        10: "#FEF0F0",
      },
      info: {
        100: "#909399",
        80: "#A6A9AD",
        60: "#C8C9CC",
        40: "#D3D4D6",
        20: "#E9E9EB",
        10: "#F4F4F5",
      },
      gray: {
        110: "#D7DAE7",
        100: "#303133",
        80: "#606266",
        60: "#909399",
        40: "#C0C4CC",
        20: "#DCDFE6",
        10: "#E4E7ED",
        5: "#EBEEF5",
        2: "#F2F6FC",
      },
    },
    fontSize: {
      "2xs": ["10px", { lineHeight: "14px" }],
      xs: ["12px", { lineHeight: "18px" }],
      sm: ["13px", { lineHeight: "20px" }],
      base: ["14px", { lineHeight: "22px" }],
      lg: ["16px", { lineHeight: "24px" }],
      xl: ["18px", { lineHeight: "28px" }],
      "2xl": ["20px", { lineHeight: "30px" }],
      "3xl": ["24px", { lineHeight: "36px" }],
      "4xl": ["36px", { lineHeight: "48px" }],
      "5xl": ["39px", { lineHeight: "51px" }],
      "6xl": ["46px", { lineHeight: "54px" }],
      "7xl": ["56px", { lineHeight: "64px" }],
    },
    borderRadius: {
      none: "0px",
      sm: "4px",
      DEFAULT: "8px",
      md: "10px",
      lg: "16px",
      xl: "20px",
      full: "9999px",
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};

