const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config({ path: '../lock.env' })






const uri = process.env.URI
const dbName = process.env.DBNAME


const client = new MongoClient(uri, { useUnifiedTopology: true });


const connect = async() => {
  try {
    await client.connect();
  } catch (err) {
    console.error(err);
  }
}




const fetchData = async() => {
    try {
      const db = client.db(dbName);
      const collection = db.collection(process.env.TESTER);
      const documents = await collection.find({}).toArray();
      return documents
      
    } catch (err) {
      console.error(err);
    } 
}



const insertdata = async(data) => {
    try{
      const db = client.db(dbName);
      const collection = db.collection(process.env.TESTER);
      
      const query = {};
      for (const key in data) {
        query[key] = { $eq: data[key] };
      }
  
      const existingData = await collection.findOne(query);
  
      if (existingData){
        console.log("Data already in database")
      }
      else{
        const result  = await collection.insertOne(data)
        return { _id: result.insertedId.toString() };
        
      }
     
    }
    catch(err){
      console.error(err)
    }
    
  }

 


const updateData = async(userId, data) => {
  try{
    const db = client.db(dbName);
    const collection = db.collection(process.env.TESTER);
    const filter = { _id: new ObjectId(userId) };
    const update = {
      $set:  {results: data}
      
    };
    await collection.updateOne(filter, update)
  }
  catch(err){
    console.error(err)
  }
}



const deleteData = async(userId) => {
    try{
      const db = client.db(dbName);
      const collection = db.collection(process.env.TESTER);
      const objectId = new ObjectId(userId); 
      await collection.deleteOne({ _id: objectId });  
    }
    catch(err){
      console.error("Error.....",err)
    }
  
  }

  module.exports = {
    fetchData,
    insertdata,
    deleteData,
    updateData,
    connect
  };