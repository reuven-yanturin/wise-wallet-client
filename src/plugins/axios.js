import axios from 'axios'

const instance = axios.create({
  // baseURL: import.env.VITE_APP_API_URL,
  baseURL: 'http://localhost:8089/api/v1',
  timeout: 30000
})

// instance.interceptors.response.use(undefined, async error => {
//   if (error.response?.status >= 500) {
//     store.commit('setSnackbar', {
//       value: true,
//       message: 'Ошибка на сервере',
//       error: true
//     })
//   } else if (error.response?.status === 401) {
//     await store.dispatch('auth/logout', false)
//   } else if (error.response?.status === 404) {
//     return
//   }
//
//   throw error
// })

export default instance
