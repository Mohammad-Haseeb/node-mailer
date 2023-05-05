const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/send-email", (req, res) => {
  let transporter = nodemailer.createTransport({
    host: "mail.pwp-co.com",
    port: 587,
    secure: false,
    auth: {
      user: "husam@pwp-co.com",
      pass: "ueflqmakekbnlgzd",
    },
  });

  // setup email data
  let mailOptions = {
    from: "husam@pwp-co.com",
    to: req.body.to,
    subject: req.body.subject,
    html: req.body.message,
  };

  // send email with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    res.send("Email sent!");
  });
});

app.listen(4000, () => {
  console.log("Server started on port 4000");
});
