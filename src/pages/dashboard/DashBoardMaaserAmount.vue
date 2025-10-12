<template>
  <VCard :loading="loading" variant="flat" rounded="lg" height="150" title="Маасер">
    <template #append>
      <VMenu>
        <template #activator="{ props }">
          <VBtn variant="plain" v-bind="props">
            {{ date }}
          </VBtn>
        </template>

        <VCard>
          <VList>
            <VListItem title="Этот Месяц" @click="date = $dayjs().format('YYYY-MM')" />
            <VListItem title="Сентябрь" @click="date = $dayjs().add(-1, 'month').format('YYYY-MM')" />
            <VListItem title="Август" @click="date = $dayjs().add(-2, 'month').format('YYYY-MM')" />
            <VListItem title="Июль" @click="getMaaserAmount" />
            <VListItem title="Июнь" @click="getMaaserAmount" />
          </VList>
        </VCard>
      </VMenu>
    </template>

    <VCardText>
      <div v-if="maaserAmount" class="text-h4 font-weight-bold text-center">
        {{ formatPriceMixin(maaserAmount) }}
      </div>
    </VCardText>
  </VCard>
</template>

<script>
import api from "@/plugins/api"

export default {
  data: ({ $dayjs }) => ({
    loading: false,

    date: $dayjs().format('YYYY-MM'),
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
