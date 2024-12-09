<template>
  <VContainer v-if="category" fluid>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1>{{ category.name }}</h1>
    </div>

    <div class="d-flex flex-column gap-3" style="max-width: 900px">
      <VCard variant="flat" class="rounded-lg">
        <VCardText>
          <VRow>
            <VCol cols="12">
              <VTextField
                v-model="form.name"
                label="Name"
                variant="outlined"
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
    </div>
  </VContainer>
</template>

<script>
import api from '@/plugins/api.js'

export default {
  name: 'Category',

  props: {
    categoryId: { type: [String, Number], required: true }
  },

  data: () => ({
    loading: false,

    category: undefined,

    form: {
      name: ''
    }
  }),

  async created() {
    await this.getCategory()
  },

  methods: {
    async getCategory() {
      this.loading = true

      try {
        const { data } = await api.categories.getOne(this.categoryId)

        this.category = data

        this.form.name = data.name
      } finally {
        this.loading = false
      }
    },

    async save() {
      this.loading = true

      try {
        await api.categories.update(this.categoryId, this.form)

        this.$router.push({ name: 'categories' })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
