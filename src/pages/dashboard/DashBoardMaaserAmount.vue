<template>
  <VCard :loading="loading" variant="flat" rounded="lg" height="150" title="Маасер">
    <template #append>
      <MonthsSelect v-model="date" />
    </template>

    <VCardText>
      <div v-if="maaserAmount" class="text-h4 font-weight-bold text-center">
        {{ formatPriceMixin(maaserAmount) }}
      </div>
    </VCardText>
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
    maaserAmount: undefined,
  }),

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

        this.maaserAmount = data
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
