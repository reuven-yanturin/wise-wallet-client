<template>
  <div class="d-flex flex-column gap-6 pb-16">
    <div class="d-flex gap-4">
      <VMenu>
        <template #activator="{ props }">
          <VBtn color="primary" variant="flat"  v-bind="props">
            Добавить
          </VBtn>
        </template>

        <VList>
          <VListItem :to="{ name: 'transaction-create', query: { type: 'income' } }" title="Доход" />

          <VListItem :to="{ name: 'transaction-create', query: { type: 'expense' } }" title="Расход" />

          <VListItem :to="{ name: 'transaction-create', query: { type: 'transfer' } }" title="Перевод" />
        </VList>
      </VMenu>

      <UploadTransactions @success="getTransactions"/>
    </div>

    <TransactionsFilter
      v-model:start-date="filter.startDate"
      v-model:end-date="filter.endDate"
      v-model:account="filter.account"
      v-model:category="filter.category"
      v-model:parent="filter.parent"
      v-model:type="filter.type"
      v-model:amount="filter.amount"
    />

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
  </div>
</template>

<script>
import TransactionsFilter from "@/pages/transactions/TransactionsFilter.vue"
import UploadTransactions from "@/pages/transactions/UploadTransactions.vue"
import api from "@/plugins/api"

export default {
  name: 'Transactions',

  components: {
    UploadTransactions,
    TransactionsFilter
  },

  data: () => ({
    loading: false,
    itemsPerPage: 50,

    filter: {
      startDate: undefined,
      endDate: undefined,
      account: undefined,
      category: undefined,
      parent: undefined,
      type: undefined,
      amount: undefined,
    },

    transactions: [],
    totalItems: 0
  }),

  watch: {
    filter: {
      deep: true,
      async handler () {
        await this.getTransactions()
      }
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
