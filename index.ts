import { S3Client } from '@aws-sdk/client-s3';
import express from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';

const standardUpload = multer({ dest: 'uploads/' })

const customDiskstorage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, 'uploads/');
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.originalname.split('.')[0] + '-' + Date.now() + path.extname(file.originalname)
    );
  }
});

const customDiskstorageUpload = multer({
  storage: customDiskstorage
});

const s3 = new S3Client({
  forcePathStyle: false, // Configures to use subdomain/virtual calling format.
  endpoint: process.env['S3_ENDPOINT'] as string,
  region: process.env['S3_REGION'] as string,
  credentials: {
    accessKeyId: process.env['S3_KEY'] as string,
    secretAccessKey: process.env['S3_SECRET'] as string
  }
})

const bucketFolder = process.env['PROJECT_BUCKET_FOLDER'] as string;
const bucket = process.env['PROJECT_BUCKET'] as string;

const s3Upload = multer({
  storage: multerS3({
    s3,
    bucket,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, `${bucketFolder}/${Date.now().toString()}`)
    }
  })
})


// Express
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.post('/upload', standardUpload.single('avatar'), (req, res, next) => {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log(req.file);
  
  res.sendFile(path.join(__dirname, '/index.html'));
})

app.post('/s3-upload', s3Upload.single('avatar'), (req, res, next) => {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log(req.file);
  
  res.sendFile(path.join(__dirname, '/index.html'));
})

app.post('/custom-diskstorage-upload', customDiskstorageUpload.array('multiFilesDone', 50), (req, res, next) => {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log(req.files);
  
  res.sendFile(path.join(__dirname, '/index.html'));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})