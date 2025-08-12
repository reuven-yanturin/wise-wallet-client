<template>
  <VCard variant="flat" rounded="lg">
    <VCardText>
      <VDataTableServer
        v-model:items-per-page="itemsPerPage"
        :headers="[
          { title: 'Id', key: 'id' },
          { title: 'Счёт', key: 'account'  },
          { title: 'Категория', key: 'category' },
          { title: 'Сумма', key: 'amount' },
          { title: 'Дата', key: 'date' },
          { title: 'Тип', key: 'type' },
          { title: '', key: 'actions' },
        ]"
        :items="recurringTransactions"
        :items-length="totalItems"
        :loading="loading"
      >
        <template #item.account="{ item }">
          {{ item.account.name }}
        </template>

        <template #item.category="{ item }">
          {{ item.category.name }}
        </template>

        <template #item.amount="{ item }">
          <span :class="{'text-success': item.type === 'income', 'text-error': item.type === 'expense'}">
            {{ formatPriceMixin(item.amount) }}
          </span>
        </template>

        <template #item.date="{ item }">
          {{ $dayjs(item.date).format("DD MMM, YYYY HH:mm") }}
        </template>

        <template #item.type="{ item }">
          <VChip :color="{ income: 'success', expense: 'error', transfer: 'default' }[item.type]">
            <template #prepend>
              <FontAwesomeIcon v-if="item.type === 'income'" icon="arrow-trend-up" class="mr-2"/>

              <FontAwesomeIcon v-if="item.type === 'expense'" icon="arrow-trend-down" class="mr-2"/>

              <FontAwesomeIcon v-if="item.type === 'transfer'" icon="arrow-right-arrow-left" class="mr-2"/>
            </template>

            {{ item.type }}
          </VChip>
        </template>
      </VDataTableServer>
    </VCardText>
  </VCard>
</template>

<script>
import api from "@/plugins/api"

export default {
  name: 'TransactionsRecurring',

  data: () => ({
    loading: false,
    itemsPerPage: 50,

    recurringTransactions: [],
    totalItems: 0
  }),

  async created() {
    await this.getRecurringTransactions()
  },

  methods: {
    async getRecurringTransactions() {
      this.loading = true

      try {
        const { data } = await api.transactions.getRecurringTransactions({
          skip: 0,
          take: this.itemsPerPage,
        })

        this.recurringTransactions = data.recurringTransactions
        this.totalItems = data.count
      } finally {
        this.loading = false
      }
    },
  }
}
</script>
