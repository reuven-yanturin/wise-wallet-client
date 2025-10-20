<template>
  <VCard :loading="loading" variant="flat" rounded="lg" height="150" title="Маасер">
    <template #append>
      <VMenu>
        <template #activator="{ props }">
          <VBtn variant="plain" v-bind="props">
            {{ $dayjs(date).format('MMMM') }}
          </VBtn>
        </template>

        <VCard>
          <VList>
            <VListItem
              v-for="(month, index) of months"
              :key="index"
              :title="month.title"
              :active="date === month.value"
              @click="date = month.value"
            />
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
import 'dayjs/locale/ru'
import api from "@/plugins/api"

export default {
  data: ({ $dayjs }) => {
    $dayjs.locale('ru')

    return {
      loading: false,

      date: $dayjs().format('YYYY-MM'),
      maaserAmount: undefined,
    }
  },

  computed: {
    months: (vm) => {
      const now = vm.$dayjs()

      return Array
        .from({ length: 12 }, (_, i) => {
          const month = vm.$dayjs().startOf('year').add(i, 'month')

          return {
            title: month.format('MMMM').replace(/^./, (ch) => ch.toUpperCase()),
            value: month.format('YYYY-MM')
          }
        })
        .filter(({ value }) =>
          vm.$dayjs(value).isBefore(now) || vm.$dayjs(value).isSame(now, 'month')
        )
        .reverse()
    }
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

        this.maaserAmount = data
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
