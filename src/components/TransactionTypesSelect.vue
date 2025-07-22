<template>
  <VSelect
    :model-value="modelValue"
    :items="[
      { title: 'Income', value: 'income' },
      { title: 'Expense', value: 'expense' },
      { title: 'Transfer', value: 'transfer' },
    ]"
    label="Type"
    variant="outlined"
    density="compact"
    hide-details="auto"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script>
export default {
  props: {
    modelValue: { type: String, default: undefined },
  },
}
</script>
