<template>
  <VRow>
    <VCol v-for="(account, index) of accounts" :key="index" cols="12" md="3">
      <VCard variant="flat" color="#191f2f" height="150" rounded="lg">
        <VCardTitle class="mt-2 mb-3 text-body-1 d-flex align-center">
          {{ account.name }}

          <VSpacer />

          <VMenu>
            <template #activator="{ props }">
              <VBtn icon="fa-solid fa-ellipsis-vertical" variant="text" density="comfortable" v-bind="props" />
            </template>

            <VList>
              <VListItem
                title="Income"
                :to="{ name: 'transaction-create', query: { type: 'income', accountId: account.id } }"
              />

              <VListItem
                title="Expense"
                :to="{ name: 'transaction-create', query: { type: 'expense', accountId: account.id } }"
              />

              <VListItem
                title="Transfer"
                :to="{ name: 'transaction-create', query: { type: 'transfer', accountId: account.id } }"
              />
            </VList>
          </VMenu>
        </VCardTitle>

        <VCardText>
          <h3 class="text-h4">
            {{ formatPriceMixin(account.balance) }}
          </h3>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<script>
import api from "@/plugins/api"

export default {
  name: "AccountsWidget",

  data: () => ({
    loading: false,
    accounts: []
  }),

  async created() {
    await this.fetchAccounts()
  },

  methods: {
    async fetchAccounts () {
      this.loading = true

      try {
        const { data } = await api.accounts.getList({ withoutZeroBalance: true })

        this.accounts = data
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
