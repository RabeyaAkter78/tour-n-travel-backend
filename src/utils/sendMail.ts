/* eslint-disable prettier/prettier */
import nodemailer from 'nodemailer'

const SendMail = async (to: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'rabeyaakterbdcit@gmail.com',
      pass: 'hzvh ywpi wikv szzp',
    },
  })

  await transporter.sendMail({
    from: 'Tour and Travels',
    to,
    subject: 'Hello ✔',
    text: 'Hello world?', // plain‑text body
    html,
  })
}
export default SendMail
