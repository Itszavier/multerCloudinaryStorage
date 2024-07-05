// import multer from "multer";
import express from 'express';
import multer from "multer";
import dotenv from 'dotenv'
import fs from 'fs'
import {v2 as cloudinary} from 'cloudinary';
import { CloudinaryStorage } from "."


dotenv.config();
const app = express();

cloudinary.config({
    api_key: process.env.key,
    api_secret: process.env.secret,
    cloud_name: "Your cloud name go here",
    secure: true,
});


const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "files"
  }
})

const upload = multer({
    storage: storage,
})


app.post('/upload',  upload.single('file'), function (req, res) {
  console.log(req.file!.filename, req.file!.path);
 // save to database here
 // Path: the url, filename the public id
 res.json({success: 'true', filename: req.file!.filename, path: req.file!.path})
})

app.get('/', (req, res) => {
    try {
      const html = fs.readFileSync('test.index.html', 'utf8');
      res.send(html);
    } catch (err) {
      console.error('Error reading file:', err);
      res.status(500).send('Internal Server Error');
    }
  });

app.listen(8080, () => {
    console.log('listening on http://localhost/8080');
})