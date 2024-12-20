<template>
  <VContainer fluid>
    <VRow>
      <VCol cols="12">
        <h1>Transactions</h1>
      </VCol>

      <VCol cols="12">
        <AccountsWidget />
      </VCol>

      <VCol cols="12" class="d-flex gap-4">
        <VMenu>
          <template #activator="{ props }">
            <VBtn color="primary" variant="flat"  v-bind="props">
              Add New
            </VBtn>
          </template>

          <VList>
            <VListItem :to="{ name: 'transaction-create', query: { type: 'income' } }">
              <VListItemTitle>Income</VListItemTitle>
            </VListItem>

            <VListItem :to="{ name: 'transaction-create', query: { type: 'expense' }  }">
              <VListItemTitle>Expense</VListItemTitle>
            </VListItem>

            <VListItem :to="{ name: 'transaction-create', query: { type: 'transfer' }  }">
              <VListItemTitle>Transfer</VListItemTitle>
            </VListItem>
          </VList>
        </VMenu>

        <UploadTransactions @success="getTransactions"/>
      </VCol>

      <VCol cols="12">
        <VCard variant="flat" rounded="lg">
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
      </VCol>
    </VRow>
  </VContainer>
</template>

<script>
import api from '@/plugins/api.js'
import AccountsWidget from "@/components/AccountsWidget.vue"
import UploadTransactions from "@/pages/transactions/UploadTransactions.vue"

export default {
  name: 'Transactions',

  components: {
    UploadTransactions,
    AccountsWidget
  },

  data: () => ({
    loading: false,
    itemsPerPage: 50,

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
