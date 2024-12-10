<template>
  <div v-if="loading">
    loading
  </div>
  <VCarousel v-else hide-delimiter-background :show-arrows="false" dark height="150" class="rounded-lg">
    <VCarouselItem v-for="(account, index) of accounts" :key="index">
      <VCard variant="flat" color="#191f2f" height="150">
        <VCardTitle class="mt-2 mb-3 text-body-1">
          {{ account.name }}
        </VCardTitle>

        <VCardText>
          <h3 class="text-h4">
            {{ formatPriceMixin(account.balance) }}
          </h3>
        </VCardText>
      </VCard>
    </VCarouselItem>
  </VCarousel>
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
