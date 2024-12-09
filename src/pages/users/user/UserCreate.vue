<template>
  <VContainer fluid>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1>Add new User</h1>
    </div>

    <VRow>
      <VCol cols="12" md="8">
        <VCard variant="flat" class="rounded-lg mb-4">
          <VCardText>
            <VRow>
              <VCol cols="12" md="6">
                <VTextField
                  v-model="form.firstName"
                  label="First Name"
                  variant="outlined"
                  density="compact"
                  hide-details="auto"
                />
              </VCol>

              <VCol cols="12" md="6">
                <VTextField
                  v-model="form.lastName"
                  label="Last Name"
                  variant="outlined"
                  density="compact"
                  hide-details="auto"
                />
              </VCol>

              <VCol cols="12">
                <VTextField
                  v-model="form.email"
                  label="Email"
                  variant="outlined"
                  density="compact"
                  hide-details="auto"
                />
              </VCol>

              <VCol cols="12" md="4">
                <VTextField
                  v-model="form.password"
                  label="Пароль"
                  variant="outlined"
                  density="compact"
                  hide-details="auto"
                />
              </VCol>

              <VCol cols="12" md="4">
                <VTextField
                  v-model="form.passwordConfirmation"
                  label="Пароль"
                  variant="outlined"
                  density="compact"
                  hide-details="auto"
                />
              </VCol>

              <VCol cols="12" md="4" class="d-flex align-end">
                <GeneratePasswordButton v-model="form" />
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
import GeneratePasswordButton from '@/components/GeneratePasswordButton.vue'

export default {
  name: 'CategoryCreate',

  components: {
    GeneratePasswordButton
  },

  data: () => ({
    loading: false,

    form: {
      firstName: undefined,
      lastName: undefined,
      middleName: undefined,
      email: undefined,
      password: undefined,
      passwordConfirmation: undefined,
    }
  }),

  methods: {
    async save() {
      this.loading = true

      try {
        await api.users.create(this.form)

        this.$router.push({ name: 'users' })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
