const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()

const {fetchData, insertdata, deleteData, connect, updateData} = require('./src/Backend/crud')
const {checkLogin, signUpHandler, updateUserData, getUserData} = require('./src/Backend/user')

app.use(cors());
app.use(bodyParser.json({ limit: '100mb' }));


connect();

const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;


app.get('/api/getData', async(req, res) => {
        const data = await fetchData();
        res.json(data)
});

app.post('/api/login', async(req, res) => {
  const email = req.body.Email
  const password = req.body.Password
  const data = await checkLogin(email,password);
  const token = jwt.sign({ id: 0 }, secretKey);
  res.set('Authorization', 'Bearer ' + token);
  res.json(data)
});

app.post('/api/postData',async(req, res) => {
  const postData = req.body; 
  const result = await insertdata(postData);
  res.json(result)
  
})

app.post('/api/signup',async(req, res) => {
  const postData = req.body; 
  const result = await signUpHandler(postData);
  res.json(result)  
})

app.put('/api/updateData/:id', (req, res) => {
  const ID = req.params.id
  const putData = req.body
  updateData(ID, putData)
  res.json("data has been updated")
})

app.delete('/api/deleteData/:id',(req, res)=>{
  const ID = req.params.id
  deleteData(ID)
  res.send("Successful")
})

app.put('/api/updateUserData/:id',(req, res) => {
  
  const ID = req.params.id
  const image = req.body.Image
  updateUserData(ID,image)
  res.send("Data Updated Successfully")
})

app.get('/api/getUserData/:id',(req, res) => {
  const ID = req.params.id
  const data = getUserData(ID)
  res.send(data)
})

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});




app.listen(process.env.PORT || 5000,()=>{
    console.log(`App is running on port ${process.env.PORT}`)
})