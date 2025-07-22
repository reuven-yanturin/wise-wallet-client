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
            <span v-if="item.isDeleted" class="text-error">
              deleted
            </span>

            <VMenu v-else>
              <template #activator="{ props }">
                <VBtn icon="mdi-dots-vertical" variant="text" density="comfortable" v-bind="props" />
              </template>

              <VList>
                <VListItem
                  title="Show"
                  :to="{ name: 'category', params: { categoryId: item.id } }"
                />

                <VListItem title="Delete" @click="deleteCategory(item)" />
              </VList>
            </VMenu>
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
