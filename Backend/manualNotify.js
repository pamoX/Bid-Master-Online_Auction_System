require('dotenv').config();
const mongoose = require('mongoose');
const { notifyWinners } = require('./utils/auctionWinnerNotifier');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  await notifyWinners();
  mongoose.connection.close();
});
