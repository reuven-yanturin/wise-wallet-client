<template>
  <VContainer fluid>
    <VRow>
      <VCol cols="12">
        <h1>Категории</h1>
      </VCol>

      <VCol cols="12">
        <VBtn color="primary" variant="flat" :to="{ name: 'category-create' }">
          Добавить
        </VBtn>
      </VCol>

      <VCol cols="12">
        <CategoriesFilter
          v-model:category="filter.category"
        />
      </VCol>

      <VCol cols="12">
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
      </VCol>
    </VRow>
  </VContainer>
</template>

<script>
import api from '@/plugins/api.js'
import CategoriesFilter from "./CategoriesFilter.vue"

export default {
  name: 'Categories',

  components: {
    CategoriesFilter
  },

  data: () => ({
    loading: false,
    itemsPerPage: 50,
    categories: [],
    totalItems: 0,

    filter: {
      category: undefined,
    },
  }),

  watch: {
    filter: {
      deep: true,
      immediate: true,
      handler: 'getCategories'
    }
  },

  async created() {
    await this.getCategories()
  },

  methods: {
    async getCategories() {
      this.loading = true

      try {
        const { data } = await api.categories.getAll({
          skip: 0,
          take: this.itemsPerPage,
          ...this.filter
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
