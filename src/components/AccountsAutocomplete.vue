<template>
  <VAutocomplete
    :model-value="modelValue"
    :items="accounts"
    :loading="loading"
    :label="label"
    item-value="id"
    item-title="name"
    variant="outlined"
    density="compact"
    hide-details="auto"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script>
import api from "@/plugins/api"

export default {
  props: {
    modelValue: { type: Number, default: undefined },
    label: { type: String, default: 'Account' },
  },

  data: () => ({
    loading: false,
    accounts: [],
  }),

  async created() {
    await this.fetchAccount()
  },

  methods: {
    async fetchAccount () {
      this.loading = true

      try {
        const { data } = await api.accounts.getList()

        this.accounts = data
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
