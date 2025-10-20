<template>
  <VSelect
    v-model="selectDate"
    :items="months"
    label="Дата"
    variant="outlined"
    density="compact"
    hide-details="auto"
  >
    <template #selection="{ item }">
      {{ item.title }}
    </template>
  </VSelect>
</template>

<script>
import 'dayjs/locale/ru'

export default {
  props: {
    startDate: { type: [String, Date], default: undefined },
    endDate: { type: [String, Date], default: undefined }
  },

  data: (vm) => ({
    selectDate: {
      startDate: vm.$dayjs().startOf('month').format(),
      endDate: vm.$dayjs().endOf('month').format()
    },
  }),

  computed: {
    months: (vm) => {
      vm.$dayjs.locale('ru')

      const now = vm.$dayjs()

      return Array
        .from({ length: 12 }, (_, i) => {
          const month = vm.$dayjs().startOf('year').add(i, 'month')

          return {
            title: month
              .format('MMMM')
              .replace(/^./, (ch) => ch.toUpperCase()),
            value: {
              startDate: vm.$dayjs(month).startOf('month').format(),
              endDate: vm.$dayjs(month).endOf('month').format()
            }
          }
        })
        .filter(({ value }) =>
          vm.$dayjs(value.endDate).isBefore(now) || vm.$dayjs(value.startDate).isSame(now, 'month')
        )
        .reverse()
    }
  },

  watch: {
    selectDate: {
      handler(newSelectDate) {
        if (newSelectDate) {
          this.$emit('update:start-date', newSelectDate.startDate)
          this.$emit('update:end-date', newSelectDate.endDate)
        } else {
          this.$emit('update:start-date', undefined)
          this.$emit('update:end-date', undefined)
        }
      },
      immediate: true
    }
  },

  beforeUnmount() {
    this.$dayjs.locale('en')
  }
}
</script>
