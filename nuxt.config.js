require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";

export default {
  dev: !isProduction,

  ssr: false,

  // When SPA
  loading: "@/components/shared/Loading.vue",

  // When SSR
  loadingIndicator: {
    name: "folding-cube",
    color: "#336CCE",
  },

  head: {
    title: "Quản lý khách sạn",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  css: [
    "@/assets/main.scss",
    "@/assets/ant/main.less",
    "@fortawesome/fontawesome-free/css/all.css",
  ],

  plugins: [
    "@/plugins/api",
    { src: "@/plugins/axios", mode: "client" },
    "@/plugins/ant-design",
    "@/plugins/filters",
    "@/plugins/global-components",
    "@/plugins/swiper",
  ],

  robots: [
    {
      UserAgent: "*",
      Disallow:
        process.env.APP_ENV === "production" ? ["/*.json", "/*.xml"] : "/",
    },
  ],

  server: {
    host: process.env.HOST || "localhost",
    port: process.env.PORT || "3000",
  },

  render: {
    http2: {
      push: true,
    },
  },

  buildModules: [
    "@nuxt/postcss8",
    "@nuxtjs/fontawesome",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-analytics",
  ],

  modules: ["@nuxtjs/axios", "@nuxtjs/auth-next"],

  axios: {
    baseURL: process.env.API_HOST,
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: "data.sid",
          global: true,
          required: true,
          name: "auth",
          maxAge: 60 * 60 * 24 * 30,
          type: false,
        },
        autoLogout: false,
        user: {
          property: "data.account",
          autoFetch: true,
        },
        endpoints: {
          login: {
            url: `${process.env.API_HOST}/user/login`,
            method: "POST",
          },
          logout: {
            url: `${process.env.API_HOST}/user/logout`,
            method: "GET",
          },
          user: {
            url: `${process.env.API_HOST}/user/get_profile`,
            method: "POST",
          },
        },
        redirect: {
          login: "/login",
          logout: "/",
          callback: "/login",
          home: "/",
        },
      },
    },
  },

  router: {
    // middleware: ["auth"],
  },

  build: {
    postcss: {
      plugins: {
        tailwindcss: "tailwind.config.js",
        autoprefixer: {},
        ...(process.env.APP_ENV === "production" ? { cssnano: {} } : {}),
      },
    },
    loaders: {
      less: {
        javascriptEnabled: true,
      },
    },
    babel: {
      plugins: [
        [
          "import",
          {
            libraryName: "ant-design-vue",
            libraryDirectory: "es",
            style: true,
          },
          "ant-design-vue",
        ],
      ],
    },
  },

  publicRuntimeConfig: {
    googleAnalytics: {
      id: process.env.GOOGLE_ANALYTICS_ID,
    },
  },

  env: {
    API_HOST: process.env.API_HOST || "localhost",
    RSA_PUBLIC_KEY: process.env.RSA_PUBLIC_KEY,
  },
};
