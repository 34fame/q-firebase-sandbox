import { inject, reactive, toRefs } from 'vue'
import { SessionStorage } from 'quasar'
import { useStore } from 'vuex'
import {
   collection,
   doc,
   addDoc,
   deleteDoc,
   getDoc,
   getDocs,
   updateDoc,
   query,
   orderBy,
   where,
} from 'firebase/firestore'

const state = reactive({
   products: [],
   product: {},
})

export default function useProduct() {
   const store = useStore()
   const db = inject('db')

   const loadProduct = async (id) => {
      try {
         const userId = store.getters['app/user'].uid
         const docRef = doc(db, 'users', userId, 'products', id)
         const snapshot = await getDoc(docRef)
         const result = {
            id: snapshot.id,
            ...snapshot.data(),
         }
         state.product = result
      } catch (error) {
         console.error('Product', 'loadProduct', error.message)
      }
   }

   const loadProducts = async () => {
      try {
         const userId = store.getters['app/user'].uid
         const collectionRef = collection(db, 'users', userId, 'products')
         const q = query(collectionRef, orderBy('name'))
         const snapshot = await getDocs(q)

         if (snapshot.empty) {
            state.products = []
            return null
         }

         let result = []
         snapshot.forEach((doc) => {
            result.push({
               id: doc.id,
               ...doc.data(),
            })
         })
         state.products = result
      } catch (error) {
         console.error('Product', 'loadProducts', error.message)
      }
   }

   const addProduct = async (product) => {
      try {
         const userId = store.getters['app/user'].uid
         const collectionRef = collection(db, 'users', userId, 'products')
         await addDoc(collectionRef, product)
         loadProducts()
      } catch (error) {
         console.error('Product', 'addProduct', error.code, error.message)
      }
   }

   const updateProduct = async (product) => {
      try {
         const { id, ...rest } = product
         const userId = store.getters['app/user'].uid
         const docRef = doc(db, 'users', userId, 'products', id)
         await updateDoc(docRef, rest)
         loadProducts()
      } catch (error) {
         console.error('Product', 'updateProduct', error.code, error.message)
      }
   }

   const deleteProduct = async (id) => {
      try {
         const userId = store.getters['app/user'].uid
         const docRef = doc(db, 'users', userId, 'products', id)
         await deleteDoc(docRef)
         loadProducts()
      } catch (error) {
         console.error('Product', 'deleteProduct', error.code, error.message)
      }
   }

   return {
      ...toRefs(state),
      loadProduct,
      loadProducts,
      addProduct,
      updateProduct,
      deleteProduct,
   }
}
