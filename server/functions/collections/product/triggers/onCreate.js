const functions = require('firebase-functions')

const { firestore } = require('../../../services/firebase')

// const collection = 'products'

module.exports = (collection) => functions.firestore
   .document(`${collection}/{id}`)
   .onCreate(async (snap, context) => {
      try {
         const id = context.params.id
         const docRef = firestore.collection(collection).doc(id)
         await docRef.update({ created: new Date().valueOf() })
      } catch (error) {
         console.error('collections/product/triggers', 'onCreate', error.message)
         throw new Error(error)
      }
   })
