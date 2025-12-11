<template>
  <VMenu>
    <template #activator="{ props }">
      <VBtn variant="plain" v-bind="props">
        {{ date }}
      </VBtn>
    </template>

    <VCard>
      <VList>
        <VListItem
          v-for="(month, index) of months"
          :key="index"
          :title="month.title"
          :active="date === month.value"
          @click="$emit('update:modelValue', month.value)"
        />
      </VList>
    </VCard>
  </VMenu>
</template>

<script>
export default {
  name: "MonthsSelect",

  props: {
    modelValue: { type: String, default: undefined },
  },

  computed: {
    months: (vm) => {
      const now = vm.$dayjs()

      return Array
        .from({ length: 12 }, (_, i) => {
          const month = vm.$dayjs().startOf('year').add(i, 'month')

          return {
            title: month.format('MMMM').replace(/^./, (ch) => ch.toUpperCase()),
            value: month.format('YYYY-MM')
          }
        })
        .filter(({ value }) =>
          vm.$dayjs(value).isBefore(now) || vm.$dayjs(value).isSame(now, 'month')
        )
        .reverse()
    },

    date: (vm) => {
      vm.$dayjs.locale('ru')

      const value = vm.modelValue
        ? vm.modelValue
        : vm.$dayjs().format('YYYY-MM')

      return vm.$dayjs(value).format('MMMM')
    }
  }
}
</script>
