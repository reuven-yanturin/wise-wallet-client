<template>
  <VSelect
    v-model="selectDate"
    :items="dates"
    label="Дата"
    filled
    dense
    hide-details="auto"
    :menu-props="{ offsetY: true, contentClass: 'select-menu', nudgeBottom: 8 }"
  />
</template>

<script>
export default {
  props: {
    startDate: { type: [String, Date], default: undefined },
    endDate: { type: [String, Date], default: undefined },
    defaultDate: {
      type: String,
      default: 'month',
      validator: value =>
        [
          'all',
          'week',
          'lastWeek',
          'month',
          'lastMonth',
          'last3Months',
          'year',
          'lastYear',
          'exact'
        ].includes(value)
    }
  },

  data: (vm) => ({
    selectDate: vm.defaultDate
  }),

  computed: {
    dates: () => [
      { value: 'all', title: 'Все' },
      { value: 'week', title: 'Эта неделя' },
      { value: 'lastWeek', title: 'Прошлая неделя' },
      { value: 'month', title: 'Этот месяц' },
      { value: 'lastMonth', title: 'Прошлый месяц' },
      { value: 'last3Months', title: 'Прошлые 3 месяца' },
      { value: 'year', title: 'Этот год' },
      { value: 'lastYear', title: 'Прошлый год' },
      { value: 'exact', title: 'Выбрать дату' }
    ]
  },

  watch: {
    selectDate: {
      handler(newSelectDate) {
        this.$emit('update:start-date', this.getStartDate(newSelectDate))
        this.$emit('update:end-date', this.getEndDate(newSelectDate))
      },
      immediate: true
    }
  },

  methods: {
    getStartDate(value) {
      return {
        week: this.$dayjs().startOf('week').format("YYYY-MM-DD"),
        lastWeek: this.$dayjs().add(-1, 'weeks').startOf('week').format(),
        month: this.$dayjs().startOf('month').format(),
        lastMonth: this.$dayjs().add(-1, 'months').startOf('month').format(),
        last3Months: this.$dayjs().add(-3, 'months').startOf('month').format(),
        year: this.$dayjs().startOf('year').format(),
        lastYear: this.$dayjs().add(-1, 'years').startOf('year').format(),
        exact: "exact"
      }[value]
    },

    getEndDate(value) {
      return {
        week: this.$dayjs().endOf('week').format(),
        lastWeek: this.$dayjs().add(-1, 'weeks').endOf('week').format(),
        month: this.$dayjs().endOf('month').format(),
        lastMonth: this.$dayjs().add(-1, 'months').endOf('month').format(),
        last3Months: this.$dayjs().add(-1, 'months').endOf('month').format(),
        year: this.$dayjs().endOf('year').format(),
        lastYear: this.$dayjs().add(-1, 'years').endOf('year').format(),
        exact: "exact"
      }[value]
    }
  }
}
</script>
