export const state = () => ({});

export const getters = {};

export const actions = {
  uploadImage({}, file) {
    return this.$axios.post("/upload-image", file);
  },
};

