<template>
   <q-page class="flex flex-center">
      <div class="column">
         <!-- Brand -->
         <div class="column justify-center items-center">
            <q-icon name="fas fa-shield-alt" size="64px" color="accent" />
            <span class="text-h4 text-accent">Secure Login</span>
         </div>

         <!-- Login Card -->
         <div class="q-mt-lg">
            <q-card>
               <q-card-section>
                  <q-item-label caption>Federated Login</q-item-label>
               </q-card-section>
               <q-card-section>
                  <div class="column q-gutter-y-sm">
                     <GoogleLoginBtn />
                  </div>
               </q-card-section>
            </q-card>
         </div>
      </div>
   </q-page>
</template>

<script>
import { defineComponent, defineAsyncComponent, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
   name: 'Login',

   components: {
      GoogleLoginBtn: defineAsyncComponent(() =>
         import('components/GoogleLoginBtn')
      ),
   },

   setup() {
      const store = useStore()
      const router = useRouter()

      onMounted(() => {
         if (store.getters['app/loggedIn']) {
            router.push({ name: 'home' })
         }
      })
   },
})
</script>
