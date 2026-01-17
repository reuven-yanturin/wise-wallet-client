<template>
  <VApp>
    <VLayout>
      <SideBar />

      <VAppBar>
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
import SideBar from "@/components/SideBar.vue"

export default {
  components: {
    SideBar,
    Toast
  },
}
</script>
