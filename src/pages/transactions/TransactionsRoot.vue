<template>
  <VContainer fluid>
    <VRow>
      <VCol cols="12">
        <h1>Транзакции</h1>
      </VCol>

      <VCol cols="12">
        <AccountsWidget />
      </VCol>

      <VCol cols="12">
        <VTabs color="primary" bg-color="white" class="mb-6">
          <VTab :to="{ name: 'transactions' }" exact>
            Главная
          </VTab>

          <VTab :to="{ name: 'transactions-recurring' }" exact>
            Повторяющийся
          </VTab>
        </VTabs>
      </VCol>

      <RouterView />
    </VRow>
  </VContainer>
</template>

<script>
import AccountsWidget from "@/components/AccountsWidget.vue"
import UploadTransactions from "./UploadTransactions.vue"
import TransactionsFilter from "./TransactionsFilter.vue"

export default {
  components: {
    TransactionsFilter,
    UploadTransactions,
    AccountsWidget
  },
}
</script>
