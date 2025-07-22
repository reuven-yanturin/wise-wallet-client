<template>
  <VAutocomplete
    :model-value="modelValue"
    :items="categories"
    :loading="loading"
    label="Category"
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
  },

  data: () => ({
    loading: false,
    categories: [],
  }),

  async created() {
    await this.fetchCategories()
  },

  methods: {
    async fetchCategories () {
      this.loading = true

      try {
        const { data } = await api.categories.getList()

        this.categories = data
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
