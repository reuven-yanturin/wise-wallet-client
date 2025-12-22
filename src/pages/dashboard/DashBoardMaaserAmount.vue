<template>
  <VCard :loading="loading" variant="flat" rounded="lg" title="Маасер">
    <template #append>
      <MonthsSelect v-model="date" />
    </template>

    <template v-if="maaser" #text>
      <div class="text-h4 font-weight-bold mb-4">
        {{ formatPriceMixin(maaserBalance) }}
      </div>

      <div class="d-flex justify-space-between mb-2">
        <span class="text-grey-darken-1">Всего к выплате</span>
        <span class="text-body-1 font-weight-medium">{{ formatPriceMixin(maaserTotal) }}</span>
      </div>

      <div class="d-flex justify-space-between">
        <span class="text-grey-darken-1">Уже выплачено</span>
        <span class="text-body-1 font-weight-medium">{{ formatPriceMixin(maaserPaid) }}</span>
      </div>
    </template>
  </VCard>
</template>

<script>
import 'dayjs/locale/ru'
import api from "@/plugins/api"
import MonthsSelect from "@/components/MonthsSelect.vue"

export default {
  components: {
    MonthsSelect
  },

  data: () => ({
    loading: false,

    date: undefined,
    maaser: undefined,
  }),

  computed: {
    maaserTotal: (vm) => ({
      amount: vm.maaser.total,
      currency: vm.maaser.currency
    }),

    maaserPaid: (vm) => ({
      amount: vm.maaser.paid,
      currency: vm.maaser.currency
    }),

    maaserBalance: (vm) => ({
      amount: vm.maaser.total - vm.maaser.paid,
      currency: vm.maaser.currency
    })
  },

  watch: {
    date: 'getMaaserAmount'
  },

  async created() {
    await this.getMaaserAmount()
  },

  methods: {
    async getMaaserAmount () {
      this.loading = true

      try {
        const { data } = await api.transactions.getMaaserAmount({
          date: this.date
        })

        this.maaser = data
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
