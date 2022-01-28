<template>
   <q-btn no-caps @click="signIn()">
      <div class="row justify-center q-gutter-x-md">
         <q-icon class="google google-color" name="fab fa-google" />
         <span class="text-weight-light">Login with Google</span>
      </div>
   </q-btn>
</template>

<script>
import { defineComponent, inject } from 'vue'
import {
   GoogleAuthProvider,
   signInWithRedirect,
} from 'firebase/auth'

export default defineComponent({
   name: 'GoogleLoginBtn',

   setup() {
      const auth = inject('auth')

      return {
         async signIn() {
            try {
               signInWithRedirect(auth, new GoogleAuthProvider())
            } catch (error) {
               console.error('GoogleLoginBtn', 'signIn', error.message)
            }
         },
      }
   },
})
</script>

<style lang="sass">
.google-color
   color: #4285f4
</style>
