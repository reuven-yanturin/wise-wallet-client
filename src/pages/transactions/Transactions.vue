<template>
  <VContainer fluid>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1>Transactions</h1>

      <VBtn color="primary" variant="flat" :to="{ name: 'transaction-create' }">
        Add New
      </VBtn>
    </div>

    <VCard variant="flat" class="rounded-lg">
      <VCardText>
        <VDataTableServer
          v-model:items-per-page="itemsPerPage"
          :headers="[
            { title: 'Id', key: 'id' },
            { title: 'Category', key: 'category' },
            { title: 'Type', key: 'type' },
            { title: 'Amount', key: 'amount' },
            { title: 'Account', key: 'account'  },
            { title: 'Actions', key: 'actions' },
          ]"
          :items="transactions"
          :items-length="totalItems"
          :loading="loading"
        >
          <template #item.category="{ item }">
            {{ item.category.name }}
          </template>

          <template #item.type="{ item }">
            <VChip :color="item.type === 'income' ? 'success' : 'error'">
              <template #prepend>
                <FontAwesomeIcon v-if="item.type === 'income'" icon="arrow-trend-up" class="mr-2"/>

                <FontAwesomeIcon v-if="item.type === 'expense'" icon="arrow-trend-down" class="mr-2"/>
              </template>

              {{ item.type }}
            </VChip>
          </template>

          <template #item.amount="{ item }">
            <span :class="{'text-success': item.type === 'income', 'text-error': item.type === 'expense'}">
              {{ formatPriceMixin(item.amount) }}
            </span>
          </template>

          <template #item.account="{ item }">
            {{ item.account.name }}
          </template>

          <template #item.actions="{ item }">
            <div class="d-flex">
              <span v-if="item.isDeleted">deleted</span>

              <template v-else>
                <VBtn :to="{ name: 'transaction', params: { transactionId: item.id } }">
                  Show
                </VBtn>

                <VBtn @click="deleteTransaction(item)">delete</VBtn>
              </template>
            </div>
          </template>
        </VDataTableServer>
      </VCardText>
    </VCard>
  </VContainer>
</template>

<script>
import api from '@/plugins/api.js'

export default {
  name: 'Transactions',

  data: () => ({
    loading: false,
    itemsPerPage: 15,

    transactions: [],
    totalItems: 0
  }),

  async created() {
    await this.getTransactions()
  },

  methods: {
    async getTransactions() {
      this.loading = true

      try {
        const { data } = await api.transactions.getAll({
          skip: 0,
          take: this.itemsPerPage
        })

        this.transactions = data.transactions
        this.totalItems = data.count
      } finally {
        this.loading = false
      }
    },

    async deleteTransaction (transaction) {
      this.loading = true

      try {
        await api.transactions.delete(transaction.id)

        await this.getTransactions()
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
