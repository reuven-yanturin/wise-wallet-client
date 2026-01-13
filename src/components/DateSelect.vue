<template>
  <VMenu v-model="menu" :close-on-content-click="false">
    <template #activator="{ props }">
      <VSelect
        v-if="type === 'select'"
        :model-value="date"
        label="Дата"
        variant="outlined"
        density="compact"
        hide-details="auto"
        readonly
        v-bind="props"
      />

      <VBtn v-else-if="type === 'button'" variant="plain"  v-bind="props">
        {{ date }}
      </VBtn>
    </template>

    <VLocaleProvider locale="ru">
      <VDatePicker
        v-model:month="month"
        v-model:year="year"
        hide-header
        color="primary"
        view-mode="months"
      />
    </VLocaleProvider>
  </VMenu>
</template>

<script>
import 'dayjs/locale/ru'

export default {
  props: {
    type: { type: String, default: "select" },
    startDate: { type: [String, Date], default: undefined },
    endDate: { type: [String, Date], default: undefined }
  },

  data: (vm) => ({
    menu: false,

    month: vm.$dayjs().month(),
    year: vm.$dayjs().year()
  }),

  computed: {
    date: (vm) => vm.$dayjs()
      .year(vm.year)
      .month(vm.month)
      .format('MMMM YYYY г.')
      .replace(/^./, (ch) => ch.toUpperCase())
  },

  watch: {
    month: {
      immediate: true,

      handler(newMonth) {
        const dayMonth = this.$dayjs().year(this.year).month(newMonth)

        this.$emit('update:start-date', dayMonth.startOf('month').format())
        this.$emit('update:end-date', dayMonth.endOf('month').format())

        this.menu = false
      }
    }
  },

  beforeMount() {
    this.$dayjs.locale('ru')
  },

  beforeUnmount() {
    this.$dayjs.locale('en')
  },
}
</script>
