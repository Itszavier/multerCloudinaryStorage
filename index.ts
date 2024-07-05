import { Request } from "express";
import  {v2} from "cloudinary"
import {StorageEngine} from "multer"
import { ConfigOptions, UploadApiOptions, } from "cloudinary"

function generateRandomPublicId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomPublicId = '';
  
    for (let i = 0; i < 10; i++) {
      randomPublicId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  
    return randomPublicId;
  }

export interface StorageOptions {
 cloudinary: typeof v2,
 params?: UploadApiOptions ;
}

export class CloudinaryStorage implements StorageEngine {
    private params: UploadApiOptions;
    private cloudinary: typeof v2;

    constructor(options: StorageOptions){
      if(!options.cloudinary) {
       
         throw new Error("cloudinary v2 is required");    
       }
      this.cloudinary =  options.cloudinary;

      if(options.params){
        this.params = options.params
      }else {
       this.params= {
        public_id: generateRandomPublicId(),

       }
      }
     
    }


    _handleFile(req: Request, file: Express.Multer.File, callback: (error?: any, info?: Partial<Express.Multer.File>) => void): void {
       const stream = this.cloudinary
       .uploader
       .upload_stream(this.params, function (err, results){
        if(err) {
           return callback(err)
        }

        if(!results) {
            return callback(new Error("When uploading your file the results did not come back"))
        }
        return  callback(null, {
            path: results.secure_url,
            filename: results.public_id,
          })
       })

       file.stream.pipe(stream);
    }

    _removeFile(req: Request, file: Express.Multer.File, callback:  (error: Error | null, res?: any) => void): void {
        this.cloudinary.uploader.destroy(file.filename, (err, result) => {
              if (err) {
                return callback(err);
              }

              if(!result) {
                return callback(new Error("When destroying your file the results did not come back"))
            }
              callback(null, result);
            });
          
    }
}