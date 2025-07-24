export default {
  namespaced: true,

  state: {
    show: false,
    message: "",
    color: "primary",
    timeout: undefined,
    showCloseButton: false,
  },

  mutations: {
    show(state, { message, color, timeout, showCloseButton }) {
      state.show = true
      state.message = message
      state.color = color
      state.timeout = timeout
      state.showCloseButton = showCloseButton
    },

    hide(state) {
      state.show = false
      state.timeout = undefined
      state.showCloseButton = false
    },
  },
}
