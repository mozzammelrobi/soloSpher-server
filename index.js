const express = require('express')
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000;

const app = express()



const corsOptions = {
    origin: ['http://localhost:5000/', 'http://localhost:5174']
}

// middle ware
app.use(cors(corsOptions))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('solosPhare server is running is ')

 
})

app.listen(port, () => {
    console.log(`server is running on ${port}`)
})