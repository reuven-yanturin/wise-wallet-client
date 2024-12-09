<template>
  <VContainer fluid>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1>Add new Account</h1>
    </div>

    <VRow>
      <VCol cols="12" md="4">
        <VCard variant="flat" class="rounded-lg">
          <VCardText>
            <VRow>
              <VCol cols="12">
                <VTextField
                  v-model="form.name"
                  label="Name"
                  variant="outlined"
                  density="compact"
                  hide-details="auto"
                />
              </VCol>

              <VCol cols="12">
                <VTextField
                  v-model.number="form.balance"
                  label="Balance"
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
