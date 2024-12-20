<template>
  <VContainer fluid>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1>Categories</h1>

      <VBtn color="primary" variant="flat" :to="{ name: 'category-create' }">
        Add New
      </VBtn>
    </div>

    <VCard variant="flat" class="rounded-lg">
      <VCardText>
        <VDataTableServer
          v-model:items-per-page="itemsPerPage"
          :headers="[
            { title: 'Id', key: 'id' },
            { title: 'Category', key: 'name' },
            { title: 'Actions', key: 'actions' },
          ]"
          :items="categories"
          :items-length="totalItems"
          :loading="loading"
        >
          <template #item.actions="{ item }">
            <div class="d-flex">
              <span v-if="item.isDeleted">deleted</span>

              <template v-else>
                <VBtn :to="{ name: 'category', params: { categoryId: item.id } }">
                  Show
                </VBtn>

                <VBtn @click="deleteCategory(item)">delete</VBtn>
              </template>
            </div>
          </template>
        </VDataTableServer>
      </VCardText>
    </VCard>
  </VContainer>
</template>

<script>
import api from '@/plugins/api.js'

export default {
  name: 'Categories',

  data: () => ({
    loading: false,
    itemsPerPage: 50,
    categories: [],
    totalItems: 0
  }),

  async created() {
    await this.getCategories()
  },

  methods: {
    async getCategories() {
      this.loading = true

      try {
        const { data } = await api.categories.getAll({
          skip: 0,
          take: this.itemsPerPage
        })

        this.categories = data.categories
        this.totalItems = data.count
      } finally {
        this.loading = false
      }
    },

    async deleteCategory (category) {
      this.loading = true

      try {
        await api.categories.delete(category.id)

        await this.getCategories()
      } finally {
        this.loading = false
      }
    },
  }
}
</script>
