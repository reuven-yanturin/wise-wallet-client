<template>
  <VDialog v-model="dialog" scrollable width="600">
    <template #activator="{props}">
      <VBtn color="primary" variant="outlined" v-bind="props">
        Upload transactions
      </VBtn>
    </template>

    <VCard title="Upload transactions">
      <VCardText class="pt-2">
        <VTextarea v-model="cookies" rows="24" label="Cookies" variant="outlined" hide-details />
      </VCardText>

      <template #actions>
        <VSpacer/>

        <VBtn color="primary" variant="text" @click="dialog = false">
          Cancel
        </VBtn>

        <VBtn color="primary" variant="flat" :loading="loading" @click="save">
          Send
        </VBtn>
      </template>
    </VCard>
  </VDialog>
</template>

<script>
import api from "@/plugins/api"

export default {
  data: () => ({
    cookies: undefined,
    loading: false,
    dialog: false
  }),

  methods: {
    async save() {
      this.loading = true

      try {
        await api.transactions.upload({ cookies: this.cookies })

        this.cookies = undefined
        this.dialog = false

        this.$emit('success')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

