
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cwjeixv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
        // await client.connect();

        const artCollection = client.db('artDB').collection('items');
        const artSubCollection = client.db('artDB').collection('subcategory');

        app.get('/subcategory', async (req, res) => {
            const cursor = artSubCollection.find();
            const result = await cursor.toArray();
            res.send(result)
        })

        
        app.get('/subcategory/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await artSubCollection.findOne(query);
            res.send(result)
        })

  

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

        app.put('/items/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true };
            const newItems = req.body
            const items = {
                $set: {
                    item_name: newItems.item_name,
                    name: newItems.name,
                    email: newItems.email,
                    image: newItems.image,
                    subcategory: newItems.subcategory,
                    price: newItems.price,
                    rating: newItems.rating,
                    customization: newItems.customization,
                    stockStatus: newItems.stockStatus,
                    description: newItems.description,
                    time: newItems.time
                }
            }

            const result = await artCollection.updateOne(filter, items, options)
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
