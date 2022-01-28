const functions = require('firebase-functions')

module.exports = (collection) =>
   functions.firestore.document(`${collection}/{id}`).onDelete(async (snap, context) => {
      try {
         const id = context.params.id
         const data = snap.data()
         console.log(`Product ${id} was deleted.  No other action taken.`)
      } catch (error) {
         log.addErrorEvent({
            file: `${__filename}`,
            message: error.message,
         })
         throw new Error(error)
      }
   })
