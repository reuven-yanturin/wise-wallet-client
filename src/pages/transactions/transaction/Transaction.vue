<template>
  <VContainer v-if="transaction" fluid>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1 class="text-h3 font-weight-light">Edit Transaction</h1>
    </div>

    <VRow>
      <VCol cols="12" md="4">
        <VCard variant="flat" class="rounded-lg">
          <VCardText class="d-flex flex-column gap-6">
            <TransactionTypesSelect v-model="form.type" />

            <VTextField
              v-model.number="form.amount"
              label="Amount"
              variant="outlined"
              density="compact"
              hide-details="auto"
            />

            <VTextField
              v-model="form.currency"
              label="Currency"
              variant="outlined"
              density="compact"
              hide-details="auto"
              readonly
            />

            <DatePicker v-model="form.date" label="Date" />

            <CategoriesAutocomplete
              v-if="form.type !== 'transfer'"
              v-model="form.categoryId"
            />

            <AccountsAutocomplete v-model="form.accountId" />

            <AccountsAutocomplete
              v-if="form.type === 'transfer'"
              v-model="form.accountToId"
              label="Account To"
            />

            <VTextarea
              v-model="form.note"
              label="Note"
              variant="outlined"
              density="compact"
              hide-details="auto"
              rows="3"
            />
          </VCardText>
        </VCard>

        <VCard variant="flat" class="rounded-lg">
          <template #actions>
            <VSpacer/>

            <VBtn color="primary" variant="flat" :loading="loading" @click="save">
              Save
            </VBtn>
          </template>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script>
import api from '@/plugins/api.js'
import DatePicker from "@/components/DatePicker.vue"
import CategoriesAutocomplete from "@/components/CategoriesAutocomplete.vue"
import AccountsAutocomplete from "@/components/AccountsAutocomplete.vue"
import TransactionTypesSelect from "@/components/TransactionTypesSelect.vue"

export default {
  name: 'Transaction',

  components: {
    TransactionTypesSelect,
    AccountsAutocomplete,
    CategoriesAutocomplete,
    DatePicker
  },

  props: {
    transactionId: { type: [String, Number], required: true }
  },

  data: () => ({
    loading: false,

    transaction: undefined,

    form: {
      type: undefined,
      amount: 0,
      currency: 'ILS',
      date: undefined,
      categoryId: undefined,
      accountId: undefined,
      accountToId: undefined,
      note: undefined
    }
  }),

  async created() {
    await this.getTransaction()
  },

  methods: {
    async getTransaction() {
      this.loading = true

      try {
        const { data } = await api.transactions.getOne(this.transactionId)

        this.transaction = data

        this.form.type = data.type
        this.form.amount = data.amount
        this.form.currency = data.currency
        this.form.date = data.date
        this.form.categoryId = data.category?.id
        this.form.accountId = data.account?.id
        this.form.accountToId = data.accountTo?.id
        this.form.note = data.note
      } finally {
        this.loading = false
      }
    },

    async save() {
      this.loading = true

      try {
        await api.transactions.update(this.transactionId, this.form)

        this.$router.push({ name: 'transactions' })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
