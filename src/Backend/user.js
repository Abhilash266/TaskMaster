const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');


const uri = 'mongodb+srv://anatar18:Abhilash2019@cluster0.c7jsxac.mongodb.net/'
const dbName = 'TestDB'
const client = new MongoClient(uri, { useUnifiedTopology: true });



const checkLogin = async(email,password) => {
    try {
      const db = client.db(dbName);
      const collection = db.collection('UserData');
      const documents = await collection.find({Email:email}).toArray();
      const checkPassword = await bcrypt.compare(password,documents[0].Password)
      if(documents.length > 0 && checkPassword){
        return [true,documents[0].Name]
      }
      else{
        return [false]
      }
      
    } catch (err) {
      console.error('An error occurred while fetching data:', err);
    } 
  }

  const signUpHandler = async(data) => {
    try{
      const db = client.db(dbName);
      const collection = db.collection('UserData');
      if (data.Email.length == 0 || data.Password.length == 0){
        throw new Error("Custom error");
      }
      const hashedPassword = await bcrypt.hash(data.Password,10)
      
      const query = {};
      for (const key in data) {
        query[key] = { $eq: data[key] };
      }
  
      const existingData = await collection.findOne(query);
  
      if (existingData){
        console.log("Data already in database")
      }
      else{
        data.Password = hashedPassword
        const result  = await collection.insertOne(data)
        return { _id: result.insertedId.toString() };
      }
     
    }
    catch(err){
      console.error(err)
    }
    
  }


  module.exports = {
    checkLogin,
    signUpHandler
  };