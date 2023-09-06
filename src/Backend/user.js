const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
require('dotenv').config({ path: './lock.env' })


const uri = process.env.URI
const dbName = process.env.DBNAME

const client = new MongoClient(uri, { useUnifiedTopology: true });



const checkLogin = async(email,password) => {
    try {
      const db = client.db(dbName);
      const collection = db.collection(process.env.USER);
      const documents = await collection.find({Email:email}).toArray();
      const checkPassword = await bcrypt.compare(password,documents[0].Password)
      if(documents.length > 0 && checkPassword){
        return [true,documents[0].Name, documents[0].Image.userAccountImage, documents[0]._id]
      }
      else{
        return [false]
      }
      
    } catch (err) {
      console.error(err);
    } 
  }

  const signUpHandler = async(data) => {
    try{
      const db = client.db(dbName);
      const collection = db.collection(process.env.USER);
      const hashedPassword = await bcrypt.hash(data.Password,10)
      const exdata = await collection.findOne({ Email: data.Email  })
      if (exdata){
        return false
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

  const updateUserData = async(userId, image) => {
    try{
      const db = client.db(dbName);
      const collection = db.collection(process.env.USER);
      const filter = { _id: new ObjectId(userId) };
      const update = {
        $set:  {
          Image: { userAccountImage: image }
        }
        
      };
      await collection.updateOne(filter, update)
    }
    catch(err){
      console.error(err)
    }
  }

  const getUserData = async(userId) => {
    try{
      const db = client.db(dbName);
      const collection = db.collection(process.env.USER);
      const user = await collection.findOne({ _id: new ObjectId(userId) });
      return user.Image.userAccountImage
    }
    catch(err){
      console.error(err)
    }
  }

  module.exports = {
    checkLogin,
    signUpHandler,
    updateUserData,
    getUserData
  };