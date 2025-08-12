<template>
  <VContainer fluid>
    <VRow>
      <VCol cols="12" md="8">
        <DashBoardBalanceStatistics />

        <DashBoardExpensesCategories />
      </VCol>
    </VRow>
  </VContainer>
</template>

<script>
import DashBoardBalanceStatistics from "./DashBoardBalanceStatistics.vue"
import DashBoardExpensesCategories from "./DashBoardExpensesCategories.vue"

export default {
  name: 'DashBoard',

  components: {
    DashBoardExpensesCategories,
    DashBoardBalanceStatistics
  },
}
</script>
