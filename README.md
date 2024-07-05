# multer-cloudinary 

multer-cloudinary is a custom storage engine for multer that enables seamless file uploads to Cloudinary using Express.js.

## Installation

To install multer-cloudinary and its dependencies, use npm:

- **@fluidjs/multer-cloudinary**: Custom multer storage engine for Cloudinary.
- **multer**: Middleware for handling multipart/form-data, used for file uploads.
- **express**: Web framework for Node.js used to build the server.
- **cloudinary**: Official Cloudinary SDK for Node.js, providing APIs to interact with Cloudinary.
- **dotenv**: Optional but recommended for loading environment variables (e.g., Cloudinary credentials).


```shell
npm i @fluidjs/multer-cloudinary cloudinary
```

## Usage

### Setting Up Cloudinary Credentials

Create a `.env` file in your project directory and add your Cloudinary credentials:

### Using multer-cloudinary

**Import Modules and Set Up Express Server**

Create a TypeScript or JavaScript file (`server.ts` or `server.js`) and set up your Express server with multer and CloudinaryStorage:

   ```typescript
   import express from 'express';
   import multer from 'multer';
   import { CloudinaryStorage } from '@fluidjs/multer-cloudinary';
   import { v2 as cloudinary } from 'cloudinary';
   import dotenv from 'dotenv';

   dotenv.config();

   const app = express();
   const port = process.env.PORT || 8080;

   // Configure Cloudinary
   cloudinary.config({
     cloud_name: process.env.CLOUD_NAME,
     api_key: process.env.API_KEY,
     api_secret: process.env.API_SECRET
   });

   // Configure CloudinaryStorage for multer
   const storage = new CloudinaryStorage({
     cloudinary: cloudinary,
     params: {
       folder: 'uploads', // Example folder name
       allowed_formats: ['jpg', 'jpeg', 'png'], // Example allowed formats
       transformation: [{ width: 500, height: 500, crop: 'limit' }] // Example transformation
     }
   });

   const upload = multer({ storage: storage });

   // Example route to handle file upload
   app.post('/upload', upload.single('file'), (req, res) => {
     console.log(req.file!.filename, req.file!.path); 
     // filename is the public_id, and path is the url
     // Save to database or process further
     
     res.json({ success: true });
   });

   app.listen(port, () => {
     console.log(`Server is running on http://localhost:${port}`);
   });

```



## Acknowledgments

- Built with [Express](https://expressjs.com/)
- Powered by [Cloudinary](https://cloudinary.com/)
