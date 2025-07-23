<template>
  <VContainer fluid>
    <VRow>
      <VCol cols="12">
        <h1>Транзакции</h1>
      </VCol>

      <VCol cols="12">
        <AccountsWidget />
      </VCol>

      <VCol cols="12" class="d-flex gap-4">
        <VMenu>
          <template #activator="{ props }">
            <VBtn color="primary" variant="flat"  v-bind="props">
              Добавить
            </VBtn>
          </template>

          <VList>
            <VListItem :to="{ name: 'transaction-create', query: { type: 'income' } }">
              <VListItemTitle>Доход</VListItemTitle>
            </VListItem>

            <VListItem :to="{ name: 'transaction-create', query: { type: 'expense' }  }">
              <VListItemTitle>Расход</VListItemTitle>
            </VListItem>

            <VListItem :to="{ name: 'transaction-create', query: { type: 'transfer' }  }">
              <VListItemTitle>Перевод</VListItemTitle>
            </VListItem>
          </VList>
        </VMenu>

        <UploadTransactions @success="getTransactions"/>
      </VCol>

      <VCol cols="12">
        <TransactionsFilter
          v-model:start-date="filter.startDate"
          v-model:end-date="filter.endDate"
          v-model:account="filter.account"
          v-model:category="filter.category"
          v-model:type="filter.type"
        />
      </VCol>

      <VCol cols="12">
        <VCard variant="flat" rounded="lg">
          <VCardText>
            <VDataTableServer
              v-model:items-per-page="itemsPerPage"
              :headers="[
                { title: 'Id', key: 'id' },
                { title: 'Счёт', key: 'account'  },
                { title: 'Категория', key: 'category' },
                { title: 'Сумма', key: 'amount' },
                { title: 'Дата', key: 'date' },
                { title: 'Тип', key: 'type' },
                { title: '', key: 'actions' },
              ]"
              :items="transactions"
              :items-length="totalItems"
              :loading="loading"
            >
              <template #item="{item}">
                <tr :class="{ 'bg-grey-lighten-3 text-disabled': item.isScheduled }">
                  <td>{{item.id}}</td>

                  <td>
                    <div class="d-flex flex-column py-2">
                      {{ item.account.name }}

                      <template v-if="item.accountTo">
                        <span class="ml-8">
                          <FontAwesomeIcon icon="arrow-down"/>
                        </span>

                        <span>{{ item.accountTo.name }}</span>
                      </template>
                    </div>
                  </td>

                  <td>
                    <template v-if="item.category">
                      {{ item.category.name }}
                    </template>
                  </td>

                  <td :class="{'text-success': item.type === 'income', 'text-error': item.type === 'expense'}">
                    {{ formatPriceMixin(item.amount) }}
                  </td>

                  <td>{{ $dayjs(item.date).format("DD MMM, YYYY HH:mm") }}</td>

                  <td>
                    <VChip :color="{ income: 'success', expense: 'error', transfer: 'default' }[item.type]">
                      <template #prepend>
                        <FontAwesomeIcon v-if="item.type === 'income'" icon="arrow-trend-up" class="mr-2"/>

                        <FontAwesomeIcon v-if="item.type === 'expense'" icon="arrow-trend-down" class="mr-2"/>

                        <FontAwesomeIcon v-if="item.type === 'transfer'" icon="arrow-right-arrow-left" class="mr-2"/>
                      </template>

                      {{ item.type }}
                    </VChip>
                  </td>

                  <td>
                    <VMenu>
                      <template #activator="{ props }">
                        <VBtn icon="mdi-dots-vertical" variant="text" density="comfortable" v-bind="props" />
                      </template>

                      <VList>
                        <VListItem
                          title="Show"
                          :to="{ name: 'transaction', params: { transactionId: item.id } }"
                        />

                        <VListItem title="Delete" @click="deleteTransaction(item)" />
                      </VList>
                    </VMenu>
                  </td>
                </tr>
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
import UploadTransactions from "./UploadTransactions.vue"
import TransactionsFilter from "./TransactionsFilter.vue"

export default {
  name: 'Transactions',

  components: {
    TransactionsFilter,
    UploadTransactions,
    AccountsWidget
  },

  data: () => ({
    loading: false,
    itemsPerPage: 50,

    filter: {
      startDate: undefined,
      endDate: undefined,
      account: undefined,
      category: undefined,
      type: undefined,
    },

    transactions: [],
    totalItems: 0
  }),

  watch: {
    filter: {
      deep: true,
      immediate: true,
      handler: 'getTransactions'
    }
  },

  methods: {
    async getTransactions() {
      this.loading = true

      try {
        const { data } = await api.transactions.getAll({
          skip: 0,
          take: this.itemsPerPage,
          ...this.filter
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
