/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import multer from 'multer'
import path from 'path'
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'

import fs from 'fs'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads')
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname)
    const filename =
      file.originalname
        .replace(fileExt, '')
        .toLowerCase()
        .split(' ')
        .join('-') +
      '-' +
      Date.now()
    // console.log(filename)

    cb(null, filename + fileExt)
  },
})

export const upload = multer({ storage: storage })

cloudinary.config({
  cloud_name: 'dpvqcjwud',
  api_key: '966886158427675',
  api_secret: 'EsHe2aouQQqQ5gokGYmVcOQCo_k',
})

export const sendImageCloudinary = (
  imageName: string,
  path: string
): Promise<Record<string, unknown>> => {
  return new Promise((resolve, rejects) => {
    cloudinary.uploader.upload(
      path,
      { public_id: imageName.trim() },

      (err, result) => {
        fs.unlinkSync(path)
        if (err) {
          rejects(err)
        }
        resolve(result as UploadApiResponse)
      }
    )
  })
}
