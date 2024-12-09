<template>
  <VMenu v-model="menu" :close-on-content-click="false" min-width="auto">
    <template #activator="{ props }">
      <VTextField
        :model-value="text"
        :label="label"
        variant="outlined"
        readonly
        hide-details="auto"
        density="compact"
        prepend-inner-icon="mdi-calendar"
        v-bind="{ ...props, ...$attrs }"
      />
    </template>

    <VDatePicker
      v-model="date"
      color="primary"
      hide-header
      show-adjacent-months
    />
  </VMenu>
</template>

<script>
export default {
  inheritAttrs: false,

  props: {
    modelValue: { type: String, default: undefined },
    label: { type: String, required: true },
  },

  emits: ["update:modelValue"],

  data: () => ({
    menu: false,
  }),

  computed: {
    text: (vm) => vm.modelValue && vm.$dayjs(vm.modelValue).format("YYYY-MM-DD"),

    date: {
      get() {
        return this.modelValue ? new Date(this.modelValue) : undefined
      },

      set(value) {
        this.$emit(
          "update:modelValue",
          value && this.$dayjs(value).format("YYYY-MM-DD")
        )
      },
    },
  },
}
</script>
