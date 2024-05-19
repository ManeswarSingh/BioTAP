const express = require('express');
const router = express.Router();
const base64url = require('base64url');
router.get('/register',(req,res)=>{
    return res.render('register')
})

router.post('/register', (req, res) => {
    try {
        console.log('Register request body:', req.body); 
        const { id, rawId, response, type } = req.body;

        if (!response) {
            return res.status(400).send('Response object is missing');
        }

        const clientDataJSON = base64url.decode(response.clientDataJSON);
        const attestationObject = base64url.decode(response.attestationObject);

        console.log('Register request received:');
        console.log('ID:', id);
        console.log('Raw ID:', rawId);
        console.log('Type:', type);
        console.log('Client Data JSON:', clientDataJSON);
        console.log('Attestation Object:', attestationObject);

        res.send('Registration successful');
    } catch (error) {
        console.error('Error processing register request:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/authenticate', (req, res) => {
    try {
        const { id, rawId, response, type } = req.body;

        if (!response) {
            return res.status(400).send('Response object is missing');
        }

        const clientDataJSON = base64url.decode(response.clientDataJSON);
        const authenticatorData = base64url.decode(response.authenticatorData);
        const signature = base64url.decode(response.signature);

        console.log('Authenticate request received:');
        console.log('ID:', id);
        console.log('Raw ID:', rawId);
        console.log('Type:', type);
        console.log('Client Data JSON:', clientDataJSON);
        console.log('Authenticator Data:', authenticatorData);
        console.log('Signature:', signature);

        res.send('Authentication successful');
    } catch (error) {
        console.error('Error processing authenticate request:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
