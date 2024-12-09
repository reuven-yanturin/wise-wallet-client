export default {
  methods: {
    formatPriceMixin ({ amount, currency }) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
      }).format(amount)
    }
  }
}
