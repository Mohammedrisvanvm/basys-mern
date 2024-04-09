import * as nodemailer from "nodemailer";
export const transporter: nodemailer.Transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "risvanrishu0000@gmail.com",
    pass: "eyckjbqbfsyidhaa",
  },
});
