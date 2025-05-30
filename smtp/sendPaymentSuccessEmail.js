const transporter = require("../config/transporter");

const sendPaymentSuccessEmail = async (toEmail, order) => {
  const mailOptions = {
    from: '"EsalesOneAssignment" <no-reply@testassignment.com>',
    to: toEmail,
    subject: "🎉 Order Confirmation - Payment Successful",
    html: `
      <h2>Thank you for your order!</h2>
      <p><strong>Full Name:</strong> ${order.fullName}</p>
      <p><strong>Full Name:</strong> ${order.email}</p>
      <p><strong>Order ID:</strong> ${order.orderId}</p>
      <p><strong>Product:</strong> ${order.productName}</p>
      <p><strong>Quantity:</strong> ${order.quantity}</p>
      <p><strong>Total:</strong> $${(order.amount / 100).toFixed(2)}</p>
      <p>Your payment was successful and we are processing your order.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending success email:", error);
  }
};


module.exports = {sendPaymentSuccessEmail};
