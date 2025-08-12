<template>
  <VCard
    :loading="loading"
    variant="flat"
    rounded="lg"
    title="Статистика баланса"
  >
    <VCardText>
      <VueApexCharts :options="options" :series="series" />
    </VCardText>
  </VCard>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'
import api from "@/plugins/api"

export default {
  components: {
    VueApexCharts
  },

  data: () => ({
    loading: false,

    series: []
  }),

  computed: {
    months: (vm) => Array.from({ length: 12 }, (_, i) =>
      vm.$dayjs().startOf('year').add(i, 'month').format('MMM')
    ),

    options: (vm) => ({
      chart: {
        id: 'yearly-income-expense',
        type: 'bar',
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
      plotOptions: {
        bar: { horizontal: false, borderRadius: 4, columnWidth: '55%' }
      },
      dataLabels: { enabled: false },
      xaxis: {
        categories: vm.months,
        title: { text: 'Месяц' },
      },
      yaxis: {
        title: { text: 'Сумма' },
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
      fill: { opacity: 1 },
      legend: {
        position: 'top',
        horizontalAlign: 'left'
      },
    })
  },

  async created() {
    await this.getBalanceStatistics()
  },

  methods: {
    async getBalanceStatistics () {
      this.loading = true

      try {
        const { data } = await api.transactions.getBalanceStatistics()

        const seriesMap = new Map()

        const monthIndex = new Map(this.months.map((m, i) => [m, i]))

        data
          .map(item => ({
            ...item,
            color: item.transactionType === 'income' ? '#00E396' : '#fb0015',
          }))
          .forEach(item => {
            const key = `${ item.accountName } ${ item.transactionType }`

            if (!seriesMap.has(key)) {
              seriesMap.set(key, this.months.map(() => 0))
            }

            const idx = monthIndex.get(item.month)

            if (idx !== undefined) {
              seriesMap.get(key)[idx] = Number(item.amount)
            }
          })

        this.series = Array.from(seriesMap.entries()).map(([name, data]) => ({
          name,
          data
        }))
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

