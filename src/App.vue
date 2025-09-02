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
          <VListItem :to="{ name: 'dashboard' }" title="Dashboard" />

          <VListItem :to="{ name: 'transactions' }" title="Transactions" />

          <VListItem :to="{ name: 'categories' }" title="Categories" />

          <VListItem :to="{ name: 'accounts' }" title="Accounts" />

          <VListItem :to="{ name: 'users' }" title="Users" />
        </VList>
      </VNavigationDrawer>

      <VAppBar>
        <RouterLink :to="{ name: 'dashboard' }" class="logo">Wise</RouterLink>

        <VAppBarNavIcon @click="drawer = !drawer" />

        <VSpacer />

        <VMenu>
          <template #activator="{ props }">
            <VBtn v-bind="props" icon class="me-6">
              <VAvatar
                color="brown"
                size="large"
              >
                <span class="text-h5">RY</span>
              </VAvatar>
            </VBtn>
          </template>

          <VList>
            <VListItem title="Settings" />
            <VListItem title="Help" />
            <VListItem title="Logout" />
          </VList>
        </VMenu>
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
