# @fluidjs/multer-cloudinary Documentation

What is multer-cloudinary?

A streamlined way to upload files directly to Cloudinary from your Express.js application using multer.

## Installation

```bash
npm i  @fluidjs/multer-cloudinary cloudinary
```
**Benefits:**

- Simplified integration
- Streamlined workflow
- Customizable options
- Type safety and improved code maintainability (TypeScript)
  
## Usage

1. Set Up Cloudinary Credentials:

Create a .env file in your project's root directory (exclude it from version control).

Add your Cloudinary credentials to the .env file:
### Setting Up Cloudinary Credentials

```.env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

2. Import Modules and Configure Express Server:
```ts
const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('@fluidjs/multer-cloudinary');
const { v2: cloudinary } = require('cloudinary');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

// Configure CloudinaryStorage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',  // Optional: Folder for uploaded files in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'],  // Optional: Restrict allowed file types
    transformation: [{ width: 500, height: 500, crop: 'limit' }] // Optional: Apply image transformations on upload
  }
});

const upload = multer({ storage: storage });

// Example route for file upload
app.post('/upload', upload.single('file'), (req, res) => {
  console.log('Uploaded file details:', req.file);
  // Access uploaded file information (filename, path, etc.)

  // Further processing or database storage (optional)

  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```
## Explanation:

- Imports necessary modules, including dotenv for environment variables.
- Configures Cloudinary with your credentials.
- Creates a CloudinaryStorage instance, specifying optional configurations.
- Creates a multer instance using the CloudinaryStorage engine.
- Defines an example route for file upload.
- Inside the route handler, access uploaded file details and optionally perform further processing   

## Additional Considerations:

Refer to Cloudinary's documentation for more on transformation options: https://cloudinary.com/documentation/image_transformations.
Explore the multer documentation for advanced file upload configurations
## Acknowledgments

- Built with [Express](https://expressjs.com/)
- Powered by [Cloudinary](https://cloudinary.com/)
