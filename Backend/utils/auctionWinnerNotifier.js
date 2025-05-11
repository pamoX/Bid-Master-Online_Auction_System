const cron = require('node-cron');
const Auction = require('../Model/BidAuctionModel'); // adjust path as needed
const BidNowModel = require('../Model/BidNowModel');
const User = require('../Model/UserModel');
const bidSendEmail = require('../utils/bidSendEmail');

async function notifyWinners() {
  const now = new Date();

  // Find auctions that have ended and haven't notified the winner yet
  const endedAuctions = await Auction.find({ 
    biddingEndTime: { $lte: now }, 
    winnerNotified: { $ne: true } 
  });

  for (const auction of endedAuctions) {
    // Find the highest bid for this auction
    const highestBid = await BidNowModel.findOne({ itemId: auction._id }).sort({ bidAmount: -1 });
    if (!highestBid) continue;

    // Find the user who placed the highest bid
    const winner = await User.findById(highestBid.userId);
    if (!winner || !winner.email) continue;

    // Send the winner email
    await bidSendEmail(
      winner.email,
      'Congratulations! You won the auction!',
      `You have won the auction for ${auction.name} with a bid of $${highestBid.bidAmount}.`,
      `<p>You have won the auction for <b>${auction.name}</b> with a bid of <b>$${highestBid.bidAmount}</b>.</p>`
    );

    // Mark the auction as notified
    auction.winnerNotified = true;
    await auction.save();
  }
}

// Run every minute
cron.schedule('* * * * *', notifyWinners);

module.exports = notifyWinners;
