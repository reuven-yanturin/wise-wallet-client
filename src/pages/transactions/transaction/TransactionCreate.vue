<template>
  <VContainer fluid>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1 class="text-h3 font-weight-light">Add new Transaction</h1>
    </div>

    <VRow>
      <VCol cols="12" md="4">
        <VCard variant="flat" rounded="lg" class="mb-6">
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

            <AccountsAutocomplete  v-model="form.accountId" />

            <AccountsAutocomplete
              v-if="form.type === 'transfer'"
              v-model="form.accountToId"
              label="Account To"
            />

            <VCheckbox v-model="isRecurring" label="Повторять?" hide-details />

            <VSelect
              v-if="isRecurring"
              v-model="form.periodUnit"
              :items="[
                { title: 'Day', value: 'day' },
                { title: 'Week', value: 'week' },
                { title: 'Month', value: 'month' },
                { title: 'Year', value: 'year' }
              ]"
              label="Period Unit"
              variant="outlined"
              density="compact"
              hide-details="auto"
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

            <VBtn color="primary" variant="text" :to="{ name: 'transactions' }">
              Отмена
            </VBtn>

            <VBtn color="primary" variant="flat" :loading="loading" @click="save">
              Добавить
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
import axios from "axios"

export default {
  name: 'TransactionCreate',

  components: {
    TransactionTypesSelect,
    AccountsAutocomplete,
    CategoriesAutocomplete,
    DatePicker
  },

  data: ({ $route: { query } }) => ({
    loading: false,

    isRecurring: false,

    form: {
      type: query.type || undefined,
      amount: 0,
      currency: 'ILS',
      periodUnit: undefined,
      date: undefined,
      categoryId: undefined,
      accountId: query.accountId ? Number(query.accountId) : undefined,
      accountToId: undefined,
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

  methods: {
    async save() {
      this.loading = true

      try {
        await api.transactions.create(this.form)

        this.$router.push({ name: 'transactions' })
      } catch (error) {
        if (axios.isAxiosError(error) && error.response.status === 409) {
          this.$toast("error", "Транзакция уже существует!")
        }

        throw error
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
