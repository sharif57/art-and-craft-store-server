

const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

//  artCraft
// dYJ7UpjmtUfxT1r9

// console.log(process.env.DB_USER)
// console.log(process.env.DB_PASS);

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cwjeixv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// console.log(uri);
const uri = "mongodb+srv://artCraft:dYJ7UpjmtUfxT1r9@cluster0.cwjeixv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const artCollection = client.db('artDB').collection('items');

        app.get('/items', async (req, res) => {
            const cursor = artCollection.find();
            const result = await cursor.toArray();
            res.send(result)
        })

        app.get('/myProduct/:email', async (req, res) => {
            console.log(req.params.email);
            const result = await artCollection.find({ email: req.params.email }).toArray()
            res.send(result)
        })

        app.get('/items/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await artCollection.findOne(query);
            res.send(result)
        })


        app.post('/items', async (req, res) => {
            const newUsers = req.body;
            console.log(newUsers)
            const result = await artCollection.insertOne(newUsers)
            res.send(result)
        })

        app.delete('/items/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await artCollection.deleteOne(query)
            res.send(result)
        })



        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


// Route
app.get('/', (req, res) => {
    res.send('Art & Craft Store server is running');
});

// Start server
app.listen(port, () => {
    console.log(`Art & Craft Store server is running on port: ${port}`);
});
