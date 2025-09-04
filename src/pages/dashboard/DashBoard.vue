<template>
  <VContainer fluid>
    <VRow>
      <VCol cols="12" md="8">
        <DashBoardBalanceStatistics />

        <DashBoardExpensesCategories />
      </VCol>

      <VCol cols="12" md="4">
        <DashBoardMaaserAmount />
      </VCol>
    </VRow>
  </VContainer>
</template>

<script>
import DashBoardBalanceStatistics from "./DashBoardBalanceStatistics.vue"
import DashBoardExpensesCategories from "./DashBoardExpensesCategories.vue"
import DashBoardMaaserAmount from "./DashBoardMaaserAmount.vue"

export default {
  name: 'DashBoard',

  components: {
    DashBoardExpensesCategories,
    DashBoardBalanceStatistics,
    DashBoardMaaserAmount
  },
}
</script>
