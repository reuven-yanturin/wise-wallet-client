<template>
  <VContainer fluid>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1 class="text-h3 font-weight-light">Добавить Новую Категорию</h1>
    </div>

    <div class="d-flex flex-column gap-3" style="max-width: 900px">
      <VCard variant="flat" class="rounded-lg">
        <VCardText>
          <VRow>
            <VCol cols="12">
              <VTextField
                v-model="form.name"
                label="Название Категории"
                autofocus
                variant="outlined"
                density="compact"
                hide-details="auto"
                @keyup.enter="save"
              />
            </VCol>

            <VCol cols="12">
              <CategoriesAutocomplete
                v-model="form.parentId"
                label="Родительская Категория"
              />
            </VCol>

            <VCol cols="12">
              <VCheckbox
                v-model="form.excludeFromMaaser"
                label="Исключить из Маасер"
                hide-details="auto"
                color="primary"
                density="compact"
              />
            </VCol>

            <VCol cols="12">
              <VCheckbox
                v-model="form.isTzedakah"
                label="Является Цедакой"
                hide-details="auto"
                color="primary"
                density="compact"
              />
            </VCol>
          </VRow>
        </VCardText>
      </VCard>

      <VCard variant="flat" class="rounded-lg">
        <VCardActions>
          <VSpacer/>

          <VBtn variant="text" :to="{ name: 'categories' }">
            Назад
          </VBtn>

          <VBtn color="primary" variant="flat" :loading="loading" @click="save">
            Сохранить
          </VBtn>
        </VCardActions>
      </VCard>
    </div>
  </VContainer>
</template>

<script>
import api from '@/plugins/api.js'
import CategoriesAutocomplete from "@/components/CategoriesAutocomplete.vue"

export default {
  name: 'CategoryCreate',

  components: {
    CategoriesAutocomplete
  },

  data: () => ({
    loading: false,

    form: {
      name: undefined,
      parentId: undefined,
      excludeFromMaaser: false,
      isTzedakah: false,
    }
  }),

  methods: {
    async save() {
      this.loading = true

      try {
        await api.categories.create(this.form)

        this.$router.push({ name: 'categories' })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
