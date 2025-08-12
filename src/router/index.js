import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {
    name: "dashboard",
    path: "/",
    component: () => import("@/pages/dashboard/DashBoard.vue"),
  },
  {
    name: "categories",
    path: "/categories",
    component: () => import("@/pages/categories/Categories.vue"),
  },
  {
    name: "category-create",
    path: "/categories/create",
    component: () => import("@/pages/categories/category/CategoryCreate.vue"),
  },
  {
    name: "category",
    path: "/categories/:categoryId",
    props: true,
    component: () => import("@/pages/categories/category/Category.vue"),
  },
  {
    name: "users",
    path: "/users",
    component: () => import("@/pages/users/Users.vue"),
  },
  {
    name: "user-create",
    path: "/users/create",
    component: () => import("@/pages/users/user/UserCreate.vue"),
  },
  {
    name: "user",
    path: "/users/:userId",
    props: true,
    component: () => import("@/pages/users/user/User.vue"),
  },
  {
    name: "accounts",
    path: "/accounts",
    component: () => import("@/pages/accounts/Accounts.vue"),
  },
  {
    name: "account-create",
    path: "/accounts/create",
    component: () => import("@/pages/accounts/account/AccountCreate.vue"),
  },
  {
    name: "account",
    path: "/accounts/:accountId",
    props: true,
    component: () => import("@/pages/accounts/account/Account.vue"),
  },

  {
    path: "/transactions",
    component: () => import("@/pages/transactions/TransactionsRoot.vue"),
    children: [
      {
        name: "transactions",
        path: "/",
        component: () => import("@/pages/transactions/Transactions.vue"),
      },
      {
        name: "transactions-recurring",
        path: "recurring",
        component: () => import("@/pages/transactions/TransactionsRecurring.vue"),
      }
    ]
  },
  {
    name: "transaction-create",
    path: "/transactions/create",
    component: () => import("@/pages/transactions/transaction/TransactionCreate.vue"),
  },
  {
    name: "transaction",
    path: "/transactions/:transactionId",
    props: true,
    component: () => import("@/pages/transactions/transaction/Transaction.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// // Workaround for https://github.com/vitejs/vite/issues/11804
// router.onError((err, to) => {
//   if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
//     if (!localStorage.getItem('vuetify:dynamic-reload')) {
//       console.log('Reloading page to fix dynamic import error')
//       localStorage.setItem('vuetify:dynamic-reload', 'true')
//       location.assign(to.fullPath)
//     } else {
//       console.error('Dynamic import error, reloading page did not fix it', err)
//     }
//   } else {
//     console.error(err)
//   }
// })

// router.isReady().then(() => {
//   localStorage.removeItem('vuetify:dynamic-reload')
// })

export default router
