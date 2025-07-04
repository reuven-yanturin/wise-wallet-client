import instance from './axios.js'

export default {
  categories: {
    create: body => instance.post('categories', body),

    getAll: params => instance.get('categories', { params }),

    getList: () => instance.get('categories/list'),

    getOne: categoryId => instance.get(`categories/${categoryId}`),

    update: (categoryId, body) => instance.patch(`categories/${categoryId}`, body),

    delete: categoryId => instance.delete(`categories/${categoryId}`),
  },

  users: {
    create: body => instance.post('users', body),

    getAll: params => instance.get('users', { params }),

    getOne: userId => instance.get(`users/${userId}`),

    update: (userId, body) => instance.patch(`users/${userId}`, body),

    delete: userId => instance.delete(`users/${userId}`),
  },

  accounts: {
    create: body => instance.post('accounts', body),

    getAll: params => instance.get('accounts', { params }),

    getList: (params) => instance.get('accounts/list', { params }),

    getOne: accountId => instance.get(`accounts/${accountId}`),

    update: (accountId, body) => instance.patch(`accounts/${accountId}`, body),

    delete: accountId => instance.delete(`accounts/${accountId}`),
  },

  transactions: {
    create: body => instance.post('transactions', body),

    upload: body => instance.post(`transactions/upload`, body),

    getAll: params => instance.get('transactions', { params }),

    getOne: transactionId => instance.get(`transactions/${transactionId}`),

    update: (transactionId, body) => instance.patch(`transactions/${transactionId}`, body),

    delete: transactionId => instance.delete(`transactions/${transactionId}`),
  },
}
