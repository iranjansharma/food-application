const router = require('express').Router()
const admin = require('firebase-admin')

router.get('/', (req, res) => {
    return res.send('Inside The User Router')
})

router.get('/jwtVerification', async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(500).send({ msg: 'token not Found' })
    }
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decodedValue = await admin.auth().verifyIdToken(token);
        if (!decodedValue) {
            return res.status(500).json({ success: false, msg: `Unauthorized` })
        }
        return res.status(200).json({ success: true, data: decodedValue })

    } catch (error) {
        return res.send(
            {
                success: false,
                msg: `Error in Extracting Token ${error}`
            })
    }
})

module.exports = router