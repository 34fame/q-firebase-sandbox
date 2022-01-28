import { boot } from 'quasar/wrappers'
import { initializeApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import {
   getAuth,
   connectAuthEmulator,
   onAuthStateChanged,
   setPersistence,
   browserLocalPersistence,
} from 'firebase/auth'

const useEmulator = process.env.APP_ENV === 'local'

// const firebaseConfig = {
//    apiKey: 'AIzaSyC3M9vxUdzV202uVyf59Chrhi_rzQaOLk0',
//    authDomain: 'fame-sandbox-dev.firebaseapp.com',
//    projectId: useEmulator ? 'emulator-sandbox' : 'fame-sandbox-dev',
//    storageBucket: 'fame-sandbox-dev.appspot.com',
//    messagingSenderId: '679264882364',
//    appId: '1:679264882364:web:56a81ca69452b2848c0ab9',
//    measurementId: 'G-LS6CVPFJKC',
// }
const projectId = useEmulator ? 'emulator-sandbox' : 'fame-sandbox-dev'
const firebaseConfig = {
   projectId,
   authDomain: `${projectId}.firebaseapp.com`,
   apiKey: 'foo',
}

initializeApp(firebaseConfig)
const db = getFirestore()
const auth = getAuth()

if (useEmulator) {
   connectFirestoreEmulator(db, 'localhost', 8081)
   connectAuthEmulator(auth, 'http://localhost:9099')
}

export default boot(async ({ app, router, store }) => {
   await setPersistence(auth, browserLocalPersistence)

   onAuthStateChanged(auth, async (user) => {
      if (user) {
         store.commit('app/setUser', user)
         router.push({ name: 'home' })
      } else {
         store.commit('app/clearUser')
      }
   })

   app.provide('auth', auth)
   app.provide('db', db)
})
