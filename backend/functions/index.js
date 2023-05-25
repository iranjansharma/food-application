const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const functions = require('firebase-functions');

const admin = require('firebase-admin')

const serviceAccountKey = require('./serviceAccountKey.json')

const express = require('express')
const app = express();

app.use(express.json());

const cors = require('cors');
const { FirebaseFunctionsTest } = require("firebase-functions-test/lib/lifecycle");

app.use(cors({ origin: true }));

app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    next();
});

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey)
});

app.get('/', (req, res) => {
    return res.send('Hello World')
})

const userRoute = require('./routes/user')
app.use('/api/users', userRoute);

exports.app = functions.https.onRequest(app);