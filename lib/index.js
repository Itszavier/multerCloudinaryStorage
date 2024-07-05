"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryStorage = void 0;
function generateRandomPublicId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomPublicId = '';
    for (let i = 0; i < 10; i++) {
        randomPublicId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return randomPublicId;
}
class CloudinaryStorage {
    constructor(options) {
        if (!options.cloudinary) {
            throw new Error("cloudinary v2 is required");
        }
        this.cloudinary = options.cloudinary;
        if (options.params) {
            this.params = options.params;
        }
        else {
            this.params = {
                public_id: generateRandomPublicId(),
            };
        }
    }
    _handleFile(req, file, callback) {
        const stream = this.cloudinary
            .uploader
            .upload_stream(this.params, function (err, results) {
            if (err) {
                return callback(err);
            }
            if (!results) {
                return callback(new Error("When uploading your file the results did not come back"));
            }
            return callback(null, {
                path: results.secure_url,
                filename: results.public_id,
            });
        });
        file.stream.pipe(stream);
    }
    _removeFile(req, file, callback) {
        this.cloudinary.uploader.destroy(file.filename, (err, result) => {
            if (err) {
                return callback(err);
            }
            if (!result) {
                return callback(new Error("When destroying your file the results did not come back"));
            }
            callback(null, result);
        });
    }
}
exports.CloudinaryStorage = CloudinaryStorage;
