const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const  OpenAI  = require('openai');


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
  res.json({
    message: 'File uploaded successfully'
  });
})

app.get('/api/getUserData/:id',(req, res) => {
  const ID = req.params.id
  const data = getUserData(ID)
  res.send(data)
})

// This code is for v4 of the openai package: npmjs.com/package/openai

const openai = new OpenAI({
  apiKey: process.env.CHAT_GPT_API_KEY,
});

app.post("/api/chatgpt", async(req, res) => {
  const gptInput = { prompt: req.body.prompt + ". Give instructions on how to complete the given task and the output should not exceed 400 characters."}
  const {prompt} = gptInput
  try{
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ "role": "assistant", "content": prompt}],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    res.send(response.choices[0].message.content)

  }
  catch(err){
    res.status(500).send(err)
  }
})


app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});




app.listen(process.env.PORT || 5000,()=>{
    console.log(`App is running on port ${process.env.PORT}`)
})