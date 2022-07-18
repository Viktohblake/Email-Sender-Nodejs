const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
require("dotenv").config();
const { PORT } = process.env;

app.get("/", function (request, response) {
  response.send("Welcome to Email Sender");
});

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAUTH2",
    user: process.env.MAIL_USERNAME,
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    accessToken: process.env.OAUTH_ACCESS_TOKEN,
  },
});

let mailOptions = {
  from: process.env.MAIL_USERNAME,
  to: process.env.MAIL_USERNAME,
  subject: "Testing my Nodemailer Project",
  text: "Hi, This is Victor Onoja from nodemailer project",
};

transporter.sendMail(mailOptions, function (err, data) {
  if (err) {
    console.log("Error " + err);
  } else {
    console.log("Email sent successfully");
  }
});

//port
const port = process.env.PORT || PORT;

app.listen(port, function () {
  console.log(`server running on port ${port}`);
});