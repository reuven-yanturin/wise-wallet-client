<template>
  <VContainer fluid>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1>Add new Transaction</h1>
    </div>

    <VRow>
      <VCol cols="12" md="4">
        <VCard variant="flat" class="rounded-lg">
          <VCardText>
            <VRow>
              <VCol cols="12">
                <VAutocomplete
                  v-model="form.type"
                  :items="[
                    { title: 'Income', value: 'income' },
                    { title: 'Expense', value: 'expense' },
                    { title: 'Transfer', value: 'transfer' },
                  ]"
                  label="Type"
                  variant="outlined"
                  density="compact"
                  hide-details="auto"
                />
              </VCol>

              <VCol cols="12">
                <VTextField
                  v-model.number="form.amount"
                  label="Amount"
                  variant="outlined"
                  density="compact"
                  hide-details="auto"
                />
              </VCol>

              <VCol cols="12">
                <VTextField
                  v-model="form.currency"
                  label="Currency"
                  variant="outlined"
                  density="compact"
                  hide-details="auto"
                  readonly
                />
              </VCol>

              <VCol cols="12">
                <DatePicker
                  v-model="form.date"
                  label="Date"
                />
              </VCol>

              <VCol cols="12">
                <VAutocomplete
                  v-model="form.categoryId"
                  :items="categories"
                  label="Category"
                  item-value="id"
                  item-title="name"
                  variant="outlined"
                  density="compact"
                  hide-details="auto"
                />
              </VCol>

              <VCol cols="12">
                <pre>
                  {{form.accountId}}
                </pre>
                <VAutocomplete
                  v-model="form.accountId"
                  :items="accounts"
                  label="Account"
                  item-value="id"
                  item-title="name"
                  variant="outlined"
                  density="compact"
                  hide-details="auto"
                />
              </VCol>

              <VCol cols="12">
                <VTextarea
                  v-model="form.note"
                  label="Note"
                  variant="outlined"
                  density="compact"
                  hide-details="auto"
                  rows="3"
                />
              </VCol>
            </VRow>
          </VCardText>
        </VCard>

        <VCard variant="flat" class="rounded-lg">
          <VCardActions>
            <VSpacer/>

            <VBtn color="primary" variant="flat" :loading="loading" @click="save">
              Save
            </VBtn>
          </VCardActions>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script>
import api from '@/plugins/api.js'
import { ca } from "vuetify/locale"
import DatePicker from "@/components/DatePicker.vue"

export default {
  name: 'TransactionCreate',
  components: { DatePicker },

  data: ({ $route: { query } }) => ({
    loading: false,

    categories: [],
    accounts: [],

    form: {
      type: query.type || undefined,
      amount: 0,
      currency: 'ILS',
      date: undefined,
      categoryId: undefined,
      accountId: query.accountId ? Number(query.accountId) : undefined,
      note: undefined
    }
  }),

  watch: {
    'form.type': {
      handler (type) {
        this.$router.replace({
          name: this.$route.name,
          query: { ...this.$route.query, type }
        })
      }
    },

    'form.accountId': {
      handler (accountId) {
        this.$router.replace({
          name: this.$route.name,
          query: { ...this.$route.query, accountId }
        })
      }
    }
  },

  async created() {
    await this.fetchCategories()
    await this.fetchAccount()
  },

  methods: {
    async fetchCategories () {
      this.loading = true

      try {
        const { data } = await api.categories.getList()

        this.categories = data
      } finally {
        this.loading = false
      }
    },

    async fetchAccount () {
      this.loading = true

      try {
        const { data } = await api.accounts.getList()

        this.accounts = data
      } finally {
        this.loading = false
      }
    },

    async save() {
      this.loading = true

      try {
        await api.transactions.create(this.form)

        this.$router.push({ name: 'transactions' })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
