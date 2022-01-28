const functions = require('firebase-functions')

const { firestore } = require('../../../services/firebase')
const getObjectDiff = require('../../../lib/getObjectDiff')

module.exports = (collection) =>
   functions.firestore
      .document(`${collection}/{id}`)
      .onUpdate(async (change, context) => {
         try {
            const id = context.params.id
            const before = change.before.data()
            const after = change.after.data()
            const diff = getObjectDiff(after, before)

            if (Object.keys(diff).length === 1 && (diff.created || diff.updated)) {
               return
            }

            const docRef = firestore.collection(collection).doc(id)
            await docRef.update({ updated: new Date().valueOf() })
         } catch (error) {
            throw new Error(error)
         }
      })
