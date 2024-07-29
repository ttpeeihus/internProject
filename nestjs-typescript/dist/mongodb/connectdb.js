const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://phuoctt:2KveYlOxvmlsd4ll@phuoctt.n9eyoar.mongodb.net/?retryWrites=true&w=majority&appName=phuoctt";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        const collection = client.db("your_database").collection("your_collection");
        const documents = await collection.find({}).toArray();
        console.log("Documents in 'your_collection':");
        console.log(documents);
    }
    finally {
        await client.close();
    }
}
run().catch(console.dir);
//# sourceMappingURL=connectdb.js.map