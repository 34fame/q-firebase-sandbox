<template>
   <ProductForm :data="product" @onSave="onSave" @onCancel="onCancel" />
</template>

<script>
import { defineComponent, defineAsyncComponent } from 'vue'

import useProduct from 'src/modules/product'

export default defineComponent({
   name: 'ProductUpdate',

   components: {
      ProductForm: defineAsyncComponent(() =>
         import('components/product/Form.vue')
      ),
   },

   setup(_, { emit }) {
      const { product, updateProduct } = useProduct()

      const onSave = async (product) => {
         await updateProduct(product)
         emit('hideForm')
      }

      const onCancel = () => {
         emit('hideForm')
      }

      return { product, onSave, onCancel }
   },
})
</script>

<style lang="sass"></style>
