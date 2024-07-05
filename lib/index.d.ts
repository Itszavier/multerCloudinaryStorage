import { Request } from "express";
import { v2 } from "cloudinary";
import { StorageEngine } from "multer";
import { UploadApiOptions } from "cloudinary";
export interface StorageOptions {
    cloudinary: typeof v2;
    params?: UploadApiOptions;
}
export declare class CloudinaryStorage implements StorageEngine {
    private params;
    private cloudinary;
    constructor(options: StorageOptions);
    _handleFile(req: Request, file: Express.Multer.File, callback: (error?: any, info?: Partial<Express.Multer.File>) => void): void;
    _removeFile(req: Request, file: Express.Multer.File, callback: (error: Error | null, res?: any) => void): void;
}
