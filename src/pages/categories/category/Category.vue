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
                label="Название Категории"
                variant="outlined"
                hide-details="auto"
              />
            </VCol>

            <VCol cols="12">
              <CategoriesAutocomplete
                v-model="form.parentId"
                label="Родительская Категория"
              />
            </VCol>
          </VRow>
        </VCardText>
      </VCard>

      <VCard variant="flat" class="rounded-lg">
        <VCardActions>
          <VSpacer/>

          <VBtn variant="text" :to="{ name: 'categories' }">
            Назад
          </VBtn>

          <VBtn color="primary" variant="flat" :loading="loading" @click="save">
            Сохранить
          </VBtn>
        </VCardActions>
      </VCard>
    </div>
  </VContainer>
</template>

<script>
import api from '@/plugins/api.js'
import CategoriesAutocomplete from "@/components/CategoriesAutocomplete.vue"

export default {
  name: 'Category',

  components: {
    CategoriesAutocomplete
  },

  props: {
    categoryId: { type: [String, Number], required: true }
  },

  data: () => ({
    loading: false,

    category: undefined,

    form: {
      name: undefined,
      parentId: undefined,
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
        this.form.parentId = data.parent?.id
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
