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
          <AccountsAutocomplete
            :model-value="account"
            @update:model-value="$emit('update:account', $event)"
          />
        </VCol>

        <VCol cols="12" md="3">
          <CategoriesAutocomplete
            :model-value="category"
            @update:model-value="$emit('update:category', $event)"
          />
        </VCol>

        <VCol cols="12" md="3">
          <TransactionTypesSelect
            :model-value="type"
            @update:model-value="$emit('update:type', $event)"
          />
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<script>
import DateSelect from "@/components/DateSelect.vue"
import CategoriesAutocomplete from "@/components/CategoriesAutocomplete.vue"
import AccountsAutocomplete from "@/components/AccountsAutocomplete.vue"
import TransactionTypesSelect from "@/components/TransactionTypesSelect.vue"

export default {
  components: {
    TransactionTypesSelect,
    AccountsAutocomplete,
    CategoriesAutocomplete,
    DateSelect
  },

  props: {
    startDate: { type: [String, Date], default: undefined },
    endDate: { type: [String, Date], default: undefined },
    account: { type: Number, default: undefined },
    category: { type: Number, default: undefined },
    type: { type: String, default: undefined },
  },
}
</script>
