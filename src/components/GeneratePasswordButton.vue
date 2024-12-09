<template>
  <VBtn color="primary" variant="text" @click="generatePassword">
    Сгенерировать
  </VBtn>
</template>

<script>
export default {
  name: 'GeneratePasswordButton',

  props: {
    modelValue: { type: Object, default: () => ({}) }
  },

  methods: {
    generatePassword() {
      const shuffle = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      let password = ''
      for (let i = 0; i < 8; i++) {
        password += shuffle.charAt(Math.floor(Math.random() * shuffle.length))
      }

      this.$emit('update:model-value', {
        ...this.modelValue,
        password,
        passwordConfirmation: password
      })
    }
  }
}
</script>
