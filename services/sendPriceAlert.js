const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function sendPriceAlert(userEmail, productName, oldPrice, newPrice) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: `Price Alert: ${productName}`,
    text: `The price of ${productName} has changed from ${oldPrice} to ${newPrice}.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = sendPriceAlert;
