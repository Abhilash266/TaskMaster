const { MongoClient, ObjectId } = require('mongodb');






const uri = 'mongodb+srv://anatar18:Abhilash2019@cluster0.c7jsxac.mongodb.net/'
const dbName = 'TestDB'


const client = new MongoClient(uri, { useUnifiedTopology: true });


const connect = async() => {
  try {
    await client.connect();
    console.log('Connected to the MongoDB database');
  } catch (err) {
    console.error('An error occurred while connecting to the MongoDB database:', err);
  }
}




const fetchData = async() => {
    try {
      const db = client.db(dbName);
      const collection = db.collection('Tester');
      const documents = await collection.find({}).toArray();
      return documents
      
    } catch (err) {
      console.error('An error occurred while fetching data:', err);
    } 
}



const insertdata = async(data) => {
    try{
      const db = client.db(dbName);
      const collection = db.collection('Tester');
      
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
    console.log(userId, data)
    const db = client.db(dbName);
    const collection = db.collection('Tester');
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
      const collection = db.collection('Tester');
      const objectId = new ObjectId(userId); 
      const result = await collection.deleteOne({ _id: objectId });
      console.log(result)
      
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