import { v2 as cloudinary } from "cloudinary";
export const UPLOAD_PRESET = 'rp9nzn6b';
export const CLOUD_NAME = 'dvwlh5gr1';
export const API_KEY = '337779777879148';
export const API_SECRET = '2LQQSYYAdyrS3zHM_Oh5YYRHsxM';

// await fetch('https://api.cloudinary.com/v1_1/[Your Cloud Name]/image/upload')

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
  secure: true,
});

export function uploadToCloud (file, id, callback) {
  cloudinary.uploader.upload(file, {
    upload_preset: UPLOAD_PRESET,
    public_id: id
  }, callback)
}

export function getImage (id) {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${id}.jpg`;
}