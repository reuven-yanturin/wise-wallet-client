<template>
  <VNavigationDrawer
    :model-value="drawer"
    rail
    rail-width="88"
    disable-route-watcher
    disable-resize-watcher
    permanent
    color="primary"
    @update:model-value="drawer = true"
  >
    <div class="fill-height d-flex flex-column">
      <RouterLink
        class="d-flex align-center justify-center w-100 text-decoration-none text-white"
        style="height: 86px;"
        :to="{ name: 'dashboard' }"
      >
        <VIcon size="48">fa-brands fa-weebly</VIcon>
      </RouterLink>

      <div class="d-flex flex-column gap-3">
        <RouterLink
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          class="d-flex flex-column align-center text-center text-decoration-none text-caption mx-auto"
          :style="{
            height: '60px',
            width: '80px',
            color: isActive(item.to) ? '#ffffff' : '#f9fbf9',
            letterSpacing: 'normal !important',
          }"
        >
          <div
            :class="[
              'd-flex justify-center align-center mb-1 text-center rounded-xl',
              { 'border-md': isActive(item.to) },
            ]"
            :style="{
              width: '56px',
              height: '32px',
              borderColor: `${
                isActive(item.to) ? '#ffffff' : '#9da8ae'
              } !important`,
            }"
          >
            <VIcon size="18">{{ item.icon }}</VIcon>
          </div>

          {{ item.title }}
        </RouterLink>
      </div>

<!--      <div class="mt-auto py-5 text-center" style="background-color: #162b3a">-->
<!--        <VBtn color="white" variant="outlined" icon @click="logout">-->
<!--          <VIcon>fa-solid fa-arrow-right-from-bracket</VIcon>-->
<!--        </VBtn>-->
<!--      </div>-->
    </div>
  </VNavigationDrawer>
</template>

<script>
export default {
  name: "SideBar",

  data: () => ({
    drawer: true
  }),

  computed: {
    items: () => [
      {
        icon: "fa-solid fa-chart-column",
        title: "Dashboard",
        to: { name: 'dashboard' },
        exact: true,
      },
      {
        icon: "fa-solid fa-user-tie",
        title: "Transactions",
        to: { name: "transactions" },
      },
      {
        icon: "fa-solid fa-store",
        title: "Categories",
        to: { name: "categories" },
      },
      {
        icon: "fa-solid fa-briefcase",
        title: "Accounts",
        to: { name: "accounts" },
      },
      {
        icon: "fa-solid fa-user-shield",
        title: "Users",
        to: { name: "users" },
      },
    ],
  },

  methods: {
    isActive(link) {
      const targetPath = this.$router.resolve(link).path

      if (targetPath === '/') return this.$route.path === '/'

      return this.$route.path.startsWith(targetPath)
    },
  }
}
</script>
