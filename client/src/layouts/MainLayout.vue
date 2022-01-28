<template>
   <q-layout view="lHh Lpr lFf">
      <q-header bordered class="bg-grey-9 text-white" height-hint="98">
         <q-toolbar>
            <q-toolbar-title> Quasar App </q-toolbar-title>
            <div>Quasar v{{ $q.version }}</div>
         </q-toolbar>

         <div class="row justify-between">
            <q-tabs align="left">
               <q-route-tab :to="{ name: 'home' }" label="Home" />
               <q-route-tab
                  v-if="loggedIn"
                  :to="{ name: 'products' }"
                  label="Products"
               />
            </q-tabs>

            <q-btn
               v-if="!loggedIn"
               flat
               color="white"
               label="Login"
               no-caps
               :to="{ name: 'login' }"
            />
            <q-btn
               v-else
               flat
               color="white"
               label="Logout"
               no-caps
               :to="{ name: 'logout' }"
            />
         </div>
      </q-header>

      <q-page-container>
         <router-view />
      </q-page-container>
   </q-layout>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
   name: 'MainLayout',

   setup() {
      const store = useStore()

      const loggedIn = computed(() => store.getters['app/loggedIn'])

      return { loggedIn }
   },
})
</script>
