const functions = require('firebase-functions')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

/* REST API */
app.get('/status', (req, res) => {
   res.status(200).send('Running!')
})

app.use((request, response) => {
   response.status(404).send(`Endpoint ${request.originalUrl} not found`)
})

exports.api = functions.https.onRequest(app)
/* END REST API */

/* Firestore Triggers */
const productTriggers = require('./collections/product/triggers')
exports.productTriggers = productTriggers
/* END Firestore Triggers */
