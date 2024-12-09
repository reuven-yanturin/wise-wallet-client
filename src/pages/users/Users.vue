<template>
  <VContainer fluid>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1>Users</h1>

      <VBtn color="primary" variant="flat" :to="{ name: 'user-create' }">
        Add New
      </VBtn>
    </div>

    <VCard variant="flat" class="rounded-lg">
      <VCardText>
        <VDataTableServer
          v-model:items-per-page="itemsPerPage"
          :headers="[
            {
              title: 'Id',
              key: 'id'
            },
            {
              title: 'User',
              key: 'fullName'
            },
            {
              title: 'Email',
              key: 'email'
            },
            {
              title: 'Действие',
              key: 'actions'
            },
          ]"
          :items="users"
          :items-length="totalItems"
          :loading="loading"
        >
          <template #item.fullName="{ item }">
            {{ item.firstName }} {{ item.lastName }}
          </template>

          <template #item.actions="{ item }">
            <div class="d-flex">
              <span v-if="item.isDeleted">deleted</span>

              <template v-else>
                <VBtn :to="{ name: 'user', params: { userId: item.id } }">
                  Show
                </VBtn>

                <VBtn @click="deleteUser(item)">delete</VBtn>
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
  name: 'Users',

  data: () => ({
    loading: false,
    itemsPerPage: 15,
    users: [],
    totalItems: 0
  }),

  async created() {
    await this.getUsers()
  },

  methods: {
    async getUsers() {
      this.loading = true

      try {
        const { data } = await api.users.getAll({
          skip: 0,
          take: this.itemsPerPage
        })

        this.users = data.users
        this.totalItems = data.count
      } finally {
        this.loading = false
      }
    },

    async deleteUser(user) {
      this.loading = true

      try {
        await api.users.delete(user.id)

        await this.getUsers()
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
