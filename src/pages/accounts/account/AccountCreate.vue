<template>
  <VContainer fluid>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1>Добавить Новый Счёт</h1>
    </div>

    <VRow>
      <VCol cols="12" md="4">
        <VCard variant="flat" class="rounded-lg">
          <VCardText class="d-flex flex-column gap-6">
            <VTextField
              v-model="form.name"
              label="Название"
              variant="outlined"
              density="compact"
              hide-details="auto"
            />

            <VTextField
              v-model.number="form.balance"
              label="Баланс"
              variant="outlined"
              density="compact"
              hide-details="auto"
            />

            <VTextField
              v-model="form.currency"
              label="Валюта"
              variant="outlined"
              density="compact"
              hide-details="auto"
            />
          </VCardText>
        </VCard>

        <VCard variant="flat" class="rounded-lg">
          <template #actions>
            <VSpacer/>

            <VBtn color="primary" variant="flat" :loading="loading" @click="save">
              Сохранить
            </VBtn>
          </template>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script>
import api from '@/plugins/api.js'

export default {
  name: 'AccountCreate',

  data: () => ({
    loading: false,

    form: {
      name: undefined,
      balance: 0,
      currency: undefined
    }
  }),

  methods: {
    async save() {
      this.loading = true

      try {
        await api.accounts.create(this.form)

        this.$router.push({ name: 'accounts' })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
