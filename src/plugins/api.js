import instance from './axios.js'

export default {
  categories: {
    create: body => instance.post('categories', body),

    getAll: params => instance.get('categories', { params }),

    getList: () => instance.get('categories/list'),

    getOne: categoryId => instance.get(`categories/${categoryId}`),

    update: (categoryId, body) => instance.post(`categories/${categoryId}`, body),

    delete: categoryId => instance.delete(`categories/${categoryId}`),
  },

  users: {
    create: body => instance.post('users', body),

    getAll: params => instance.get('users', { params }),

    getOne: userId => instance.get(`users/${userId}`),

    update: (userId, body) => instance.post(`users/${userId}`, body),

    delete: userId => instance.delete(`users/${userId}`),
  },

  accounts: {
    create: body => instance.post('accounts', body),

    getAll: params => instance.get('accounts', { params }),

    getList: () => instance.get('accounts/list'),

    getOne: accountId => instance.get(`accounts/${accountId}`),

    update: (accountId, body) => instance.post(`accounts/${accountId}`, body),

    delete: accountId => instance.delete(`accounts/${accountId}`),
  },

  transactions: {
    create: body => instance.post('transactions', body),

    getAll: params => instance.get('transactions', { params }),

    getOne: transactionId => instance.get(`transactions/${transactionId}`),

    update: (transactionId, body) => instance.post(`transactions/${transactionId}`, body),

    delete: transactionId => instance.delete(`transactions/${transactionId}`),
  },
}
