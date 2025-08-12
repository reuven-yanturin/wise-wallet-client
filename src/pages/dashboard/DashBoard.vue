<template>
  <VContainer fluid>
    <VRow>
      <VCol cols="12" md="8">
        <DashBoardBalanceStatistics />
      </VCol>
    </VRow>
  </VContainer>
</template>

<script>
import DashBoardBalanceStatistics from "./DashBoardBalanceStatistics.vue"

export default {
  name: 'DashBoard',

  components: {
    DashBoardBalanceStatistics
  },
}
</script>
