const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const {fetchData, insertdata, deleteData, connect, updateData} = require('./crud')
const {checkLogin, signUpHandler, updateUserData} = require('./user')

app.use(cors());
app.use(bodyParser.json());



connect();

const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';


app.get('/api/getData', async(req, res) => {
        const data = await fetchData();
        res.json(data)
});

app.post('/api/login', async(req, res) => {
  const email = req.body.Email
  const password = req.body.Password
  console.log(email,password)
  const data = await checkLogin(email,password);
  const token = jwt.sign({ id: 0 }, secretKey);
  res.set('Authorization', 'Bearer ' + token);
  res.json(data)
});

app.post('/api/postData',async(req, res) => {
  const postData = req.body; 
  console.log('Received POST data:', postData,);
  const result = await insertdata(postData);
  res.json(result)
  
})

app.post('/api/signup',async(req, res) => {
  const postData = req.body; 
  console.log('Received POST data:', postData);
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
  const name = req.body.Name
  const image = req.body.Image
  updateUserData(ID,name,image)
  res.send("Data Updated Successfully")
})

const storage = multer.diskStorage({
  destination: './Images/', // Save images in the "Images" folder
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage });

app.use(express.json());

app.post('/upload', upload.single('image'), (req, res) => {
  const imagePath = req.file.path; // Path to the stored image

  // Respond to the client with a success message or error
  res.json({ message: 'Image uploaded successfully!', imagePath });
});








const PORT = 5000

app.listen(PORT,()=>{
    console.log(`App is running on port ${PORT}`)
})