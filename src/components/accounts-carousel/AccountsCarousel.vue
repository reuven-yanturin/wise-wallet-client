<template>
  <VRow>
    <VCol v-for="(account, index) of accounts" :key="index" cols="12" md="4">
      <VCard variant="flat" color="#191f2f" height="150" rounded="lg">
        <VCardTitle class="mt-2 mb-3 text-body-1">
          {{ account.name }}
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
  name: "AccountsCarousel",

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
        const { data } = await api.accounts.getList()

        this.accounts = data

        console.log(this.accounts, "accounts")
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
