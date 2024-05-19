const express = require("express")
const mongoose  = require('mongoose')
const bodyParser = require('body-parser');
const base64url = require('base64url');
const path = require('path');
const app = express()
const PORT = 8000

const userRoute = require('./routes/user.routes')

app.use(bodyParser.json());
// app.use(express.json)
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static('images'));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/payment',(req,res)=>{
        return res.render('payment')
    })
    app.post('/payment', async (req, res) => {
        try {
            const { assertion, payment } = req.body;
            console.log('Assertion:', assertion);
            console.log('Payment data:', payment);
    
            // Verify the assertion here (using your existing WebAuthn verification logic)
            // For demonstration, assume verification passes:
            const verificationSuccessful = true;
    
            if (verificationSuccessful) {
                // Process payment here (e.g., integrate with a payment gateway)
                res.send('Payment processed successfully');
            } else {
                res.status(400).send('Authentication failed');
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            res.status(500).send('Internal server error');
        }
    });
    
   
    // app.get('/auth',(req,res)=>{
//     return res.render('index')
// })

// app.get('/register',(req,res)=>{
    //     return res.render('register')
// })


const MONGODB_URI = 'mongodb+srv://singhmaneshwar08:singh@cluster0.ndw67oh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const DB_NAME = 'biotap'
mongoose.connect(`${MONGODB_URI}/${DB_NAME}`)
.then((e)=>{
    console.log('mongodb connected')
})
app.set('view engine',"ejs")
app.get('/',(req,res)=>{
    return res.render('home')
})

app.use('/user',userRoute)
// app.post('/authenticate', (req, res) => {
//     // Handle authentication logic
//     res.send('Authenticate endpoint');
// });

// app.post('/register', (req, res) => {
//     const { id, rawId, response, type } = req.body;
//     const clientDataJSON = base64url.decode(response.clientDataJSON);
//     const attestationObject = base64url.decode(response.attestationObject);

//     console.log('Register request received:');
//     console.log('ID:', id);
//     console.log('Raw ID:', rawId);
//     console.log('Type:', type);
//     console.log('Client Data JSON:', clientDataJSON);
//     console.log('Attestation Object:', attestationObject);


//     res.send('Registration successful');
// });

// app.post('/authenticate', (req, res) => {
//     const { id, rawId, response, type } = req.body;
//     const clientDataJSON = base64url.decode(response.clientDataJSON);
//     const authenticatorData = base64url.decode(response.authenticatorData);
//     const signature = base64url.decode(response.signature);

//     console.log('Authenticate request received:');
//     console.log('ID:', id);
//     console.log('Raw ID:', rawId);
//     console.log('Type:', type);
//     console.log('Client Data JSON:', clientDataJSON);
//     console.log('Authenticator Data:', authenticatorData);
//     console.log('Signature:', signature);



//     res.send('Authentication successful');
// });


app.listen(PORT,()=>{console.log(`app listening on port ${PORT}`);})