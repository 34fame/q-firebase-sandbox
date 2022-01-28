<template>
   <div></div>
</template>

<script>
import { defineComponent, inject, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
   name: 'Logout',

   setup() {
      const router = useRouter()
      const auth = inject('auth')

      onMounted(async () => {
         try {
            await auth.signOut()
            return router.push({ name: 'home' })
         } catch (error) {
            console.error('Logout', 'onMounted', error.message)
         }
      })
   },
})
</script>
