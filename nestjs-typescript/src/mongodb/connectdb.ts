
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://phuoctt:2KveYlOxvmlsd4ll@phuoctt.n9eyoar.mongodb.net/?retryWrites=true&w=majority&appName=phuoctt";

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
      // Connect the client to the server (optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
  
      // Example: Query and print documents from a collection
      const collection = client.db("your_database").collection("your_collection");
      const documents = await collection.find({}).toArray();
      console.log("Documents in 'your_collection':");
      console.log(documents);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  

run().catch(console.dir);
