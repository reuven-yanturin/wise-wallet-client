<template>
  <VContainer fluid>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1>Add new Category</h1>
    </div>

    <VRow>
      <VCol cols="12" md="8">
        <VCard variant="flat" class="rounded-lg">
          <VCardText>
            <VRow>
              <VCol cols="12">
                <VTextField
                  v-model="form.name"
                  label="Name"
                  autofocus
                  variant="outlined"
                  density="compact"
                  hide-details="auto"
                  @keyup.enter="save"
                />
              </VCol>
            </VRow>
          </VCardText>
        </VCard>

        <VCard variant="flat" class="rounded-lg">
          <VCardActions>
            <VSpacer/>

            <VBtn variant="text" :to="{ name: 'categories' }">
              Back
            </VBtn>

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
  name: 'CategoryCreate',

  data: () => ({
    loading: false,

    form: {
      name: ''
    }
  }),

  methods: {
    async save() {
      this.loading = true

      try {
        await api.categories.create(this.form)

        this.$router.push({ name: 'categories' })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
