<template>
  <VCard variant="flat" rounded="lg">
    <VCardText>
      <VRow>
        <VCol cols="12" md="3">
          <CategoriesAutocomplete
            :model-value="category"
            @update:model-value="$emit('update:category', $event)"
          />
        </VCol>

        <VCol cols="12" md="3">
          <CategoriesAutocomplete
            :model-value="parent"
            only-parent
            @update:model-value="$emit('update:parent', $event)"
          />
        </VCol>

        <VCol cols="12" md="1">
          <VBtn variant="text" color="primary" @click="clearFilter">
            Clear
          </VBtn>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<script>
import CategoriesAutocomplete from "@/components/CategoriesAutocomplete.vue"

export default {
  components: {
    CategoriesAutocomplete
  },

  props: {
    category: { type: Number, default: undefined },
    parent: { type: Number, default: undefined },
  },

  methods: {
    clearFilter () {
      this.$emit('update:category', undefined)
      this.$emit('update:parent', undefined)
    }
  }
}
</script>
