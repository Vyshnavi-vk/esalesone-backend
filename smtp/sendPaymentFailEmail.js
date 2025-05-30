const transporter = require("../config/transporter");

const sendPaymentFailEmail = async (toEmail, { fullName, email, productTitle, errorMessage }) => {
  const mailOptions = {
    from: '"EsalesOneAssigment" <no-reply@testassignment.com>',
    to: toEmail,
    subject: "Payment Failed",
    html: `
      <h2>Hi ${fullName},</h2>
      <p>We encountered an issue processing your payment for <strong>${productTitle}</strong>.</p>
      <p><strong>Error:</strong> ${errorMessage}</p>
      <p>Please try again or contact support if the issue persists.</p>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendPaymentFailEmail };
