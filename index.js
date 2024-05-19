const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;

const app = express()


const corsOptions = {
    origin: ['http://localhost:5174'],
    credentials: true,
    optionsSuccessStatus: 200,
}

// middle ware
app.use(cors())
app.use(express.json())



// soloSpher
// aPirVGoJNrswRWZt

const uri = "mongodb+srv://soloSpher:aPirVGoJNrswRWZt@cluster0.mrpyxhs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const jobsCollection = client.db('solosphers').collection('jobs')
        const bidsCollection = client.db('solosphers').collection('bids')

        // get all jobs from database
        app.get('/jobs', async (req, res) => {
            const result = await jobsCollection.find().toArray()
            res.send(result)
        })


        // get single data by id
        app.get('/jobs/:id', async (req, res) => {
            const id = req.params.id;
            // console.log('matched id:', id)
            const query = { _id: new ObjectId(id) }
            const result = await jobsCollection.findOne(query)
            res.send(result)
        })

        //  save or  place a bids data in db
        app.post('/bid', async (req, res) => {
            const bidData = req.body;
            console.log(bidData)
            const result = await bidsCollection.insertOne(bidData)
            res.send(result)
        })

        //  save a job 
        app.post('/jobs', async (req, res) => {
            const jobData = req.body;
            console.log(jobData)
            const result = await jobsCollection.insertOne(jobData)
            res.send(result)
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally { }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('solosPhare server is running is ')


})

app.listen(port, () => {
    console.log(`server is running on ${port}`)
})