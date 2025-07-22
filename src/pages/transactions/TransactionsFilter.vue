<template>
  <VCard variant="flat" rounded="lg">
    <VCardText>
      <VRow>
        <VCol cols="12" md="3">
          <DateSelect
            :start-date="startDate"
            :end-date="endDate"
            @update:start-date="$emit('update:start-date', $event)"
            @update:end-date="$emit('update:end-date', $event)"
          />
        </VCol>

        <VCol cols="12" md="3">
          <CategoriesAutocomplete
            :model-value="category"
            @update:model-value="$emit('update:category', $event)"
          />
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<script>
import DateSelect from "@/components/DateSelect.vue"
import CategoriesAutocomplete from "@/components/CategoriesAutocomplete.vue"

export default {
  components: {
    CategoriesAutocomplete,
    DateSelect
  },

  props: {
    startDate: { type: [String, Date], default: undefined },
    endDate: { type: [String, Date], default: undefined },
    category: { type: Number, default: undefined },
  },
}
</script>
