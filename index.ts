import express from 'express';
import multer from 'multer';
import path from 'path';

const upload = multer({ dest: 'uploads/' })
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.post('/upload', upload.single('avatar'), (req, res, next) => {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log(req.file);
  
  res.send('ok')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})