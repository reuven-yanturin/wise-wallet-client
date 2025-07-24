export default {
  methods: {
    $toast(color, message, { timeout, showCloseButton } = {}) {
      this.$store.commit("toast/show", {
        message,
        color,
        timeout,
        showCloseButton,
      })
    },
  }
}
