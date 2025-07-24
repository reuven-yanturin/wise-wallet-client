<template>
  <VSnackbar
    :model-value="show"
    :timeout="timeout"
    :color="color"
    @update:model-value="hide"
  >
    {{ message }}

    <template v-if="showCloseButton" #actions>
      <VBtn color="white" variant="text" @click="hide">Close</VBtn>
    </template>
  </VSnackbar>
</template>

<script>
import { mapMutations, mapState } from "vuex"

export default {
  computed: {
    ...mapState("toast", [
      "show",
      "message",
      "color",
      "timeout",
      "showCloseButton",
    ]),
  },

  methods: {
    ...mapMutations("toast", ["hide"]),
  },
}
</script>
