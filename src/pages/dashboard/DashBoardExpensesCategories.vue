<template>
  <VCard
    :loading="loading"
    variant="flat"
    rounded="lg"
    title="Категории расходов"
  >
    <template #append>
      <DateSelect
        type="button"
        :start-date="date"
        @update:start-date="date = $dayjs($event).format('YYYY-MM')"
      />
    </template>

    <VCardText>
      <VueApexCharts :options="options" :series="series" />
    </VCardText>
  </VCard>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'
import api from "@/plugins/api"
import DateSelect from "@/components/DateSelect.vue"

export default {
  components: {
    DateSelect,
    VueApexCharts
  },

  data: () => ({
    loading: false,

    labels: [],
    series: [],
    date: undefined,
  }),

  computed: {
    options: (vm) => ({
      chart: {
        id: 'expenses-categories',
        type: 'polarArea',
        toolbar: { show: true },
        animations: {
          enabled: true,
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },
      labels: vm.labels,
      stroke: { width: 1 },
      yaxis: {
        labels: {
          formatter: (val) => new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: 'ILS'
          }).format(val)
        }
      },
      tooltip: {
        y: {
          formatter: (val) => new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: 'ILS'
          }).format(val)
        }
      },
      legend: { position: 'right' },
      plotOptions: {
        polarArea: {
          rings: { strokeWidth: 1 },
          spokes: { strokeWidth: 1 }
        }
      }
    })
  },

  watch: {
    date: 'getExpensesCategories'
  },

  async created() {
    await this.getExpensesCategories()
  },

  methods: {
    async getExpensesCategories () {
      this.loading = true

      try {
        const { data } = await api.transactions.getExpensesCategories({
          date: this.date
        })

        this.labels =  data.map(item => item.categoryName)
        this.series =  data.map(item => Number(item.amount))
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

