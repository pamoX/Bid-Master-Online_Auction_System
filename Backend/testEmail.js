const mongoose = require('mongoose');
const biddersendEmail = require('./Backend/utils/biddersendEmail');

// Connect to your MongoDB (adjust the URI as needed)
mongoose.connect('mongodb://localhost:27017/YOUR_DB_NAME', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

(async () => {
  try {
    // Replace with a real BidUser _id from your database
    const bidderId = 'PUT_A_REAL_BIDUSER_ID_HERE';
    const recipientEmail = 'your@email.com';

    await biddersendEmail(
      bidderId,
      recipientEmail,
      'Test Subject',
      'Test Body'
    );
    console.log('Test email sent!');
  } catch (err) {
    console.error('Error sending test email:', err);
  } finally {
    mongoose.connection.close();
  }
})();
