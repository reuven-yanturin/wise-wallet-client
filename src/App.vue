<template>
  <VApp>
    <VLayout>
      <VNavigationDrawer
        app
        v-model="drawer"
        fixed
        disable-route-watcher
        disable-resize-watcher
        hide-overlay
        @update:model-value="(val) => console.log(val)"
      >
        <VList density="compact" nav>
          <VListItem :to="{ name: 'transactions' }" exact>
            Transactions
          </VListItem>

          <VListItem :to="{ name: 'categories' }" exact>
            Categories
          </VListItem>

          <VListItem :to="{ name: 'accounts' }" exact>
            Accounts
          </VListItem>

          <VListItem :to="{ name: 'users' }" exact>
            Users
          </VListItem>
        </VList>
      </VNavigationDrawer>

      <VAppBar>
        <RouterLink :to="{ name: 'dashboard' }" class="logo">Wise</RouterLink>

        <VAppBarNavIcon @click="drawer = !drawer" />
      </VAppBar>

      <VMain style="background-color: #f4f6f9;">
        <RouterView />
      </VMain>

      <Toast />
    </VLayout>
  </VApp>
</template>

<script>
import Toast from "@/components/Toast.vue"

export default {
  components: {
    Toast
  },

  data: () => ({
    drawer: true
  })
}
</script>
