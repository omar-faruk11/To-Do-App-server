const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const {
    MongoClient,
    ServerApiVersion,
    ObjectId
  } = require('mongodb');
const port = process.env.PORT || 5000;



app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tiivm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});

async function run (){
    try{
        await client.connect();
        const noteCollection = client.db("notes").collection("note");
        console.log('connected');
        app.get('/notes',async(req, res)=>{
            const email = req.query.email;
            const query = {email}
            const notes = await noteCollection.find(query).toArray();
            res.send(notes)
        });

        app.post('/notes',async(req, res)=>{
          const data = req.body;
          const result = await noteCollection.insertOne(data);
          res.send(result)
      });
    }
    finally{

    }
}run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
