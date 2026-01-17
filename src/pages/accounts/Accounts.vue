<template>
  <VContainer fluid>
    <VRow>
      <VCol cols="12">
        <h1 class="text-h3 font-weight-light">Accounts</h1>
      </VCol>

      <VCol cols="12">
        <VBtn color="primary" variant="flat" :to="{ name: 'account-create' }">
          Добавить
        </VBtn>
      </VCol>

      <VCol cols="12">
        <VCard variant="flat" class="rounded-lg">
          <VCardText>
            <VDataTableServer
              v-model:items-per-page="itemsPerPage"
              :headers="[
                { title: 'Id', key: 'id' },
                { title: 'Account', key: 'name'  },
                { title: 'Balance', key: 'balance' },
                { title: 'Created at', key: 'createdAt' },
                { title: 'Actions', key: 'actions' },
              ]"
              :items="accounts"
              :items-length="totalItems"
              :loading="loading"
            >
              <template #item.balance="{ item }">
                <span
                  :class="{
                    'text-error': item.balance.amount < 0,
                    'text-success': item.balance.amount > 0
                  }"
                >
                  {{ formatPriceMixin(item.balance) }}
                </span>
              </template>

              <template #item.createdAt="{ item }">
                {{ $dayjs(item.createdAt).format("DD MMM YYYY") }}
              </template>

              <template #item.actions="{ item }">
                <span v-if="item.isDeleted" class="text-error">
                  deleted
                </span>

                <VMenu v-else>
                  <template #activator="{ props }">
                    <VBtn icon="fa-solid fa-ellipsis-vertical" variant="text" density="comfortable" v-bind="props" />
                  </template>

                  <VList>
                    <VListItem
                      title="Show"
                      :to="{ name: 'account', params: { accountId: item.id } }"
                    />

                    <VListItem title="Delete" @click="deleteAccount(item)" />
                  </VList>
                </VMenu>
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

export default {
  name: 'Accounts',

  data: () => ({
    loading: false,
    itemsPerPage: 15,

    accounts: [],
    totalItems: 0
  }),

  async created() {
    await this.getAccounts()
  },

  methods: {
    async getAccounts() {
      this.loading = true

      try {
        const { data } = await api.accounts.getAll({
          skip: 0,
          take: this.itemsPerPage
        })

        this.accounts = data.accounts
        this.totalItems = data.count
      } finally {
        this.loading = false
      }
    },

    async deleteAccount (account) {
      this.loading = true

      try {
        await api.accounts.delete(account.id)

        await this.getAccounts()
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
