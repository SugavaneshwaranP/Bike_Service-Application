const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

module.exports.sendMail = async (to, subject, text) => {
  await transporter.sendMail({
    from: '"Bike Service" <noreply@bikeservice.com>',
    to,
    subject,
    text
  });
};
