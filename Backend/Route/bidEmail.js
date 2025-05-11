const express = require('express');
const router = express.Router();
const bidSendEmail = require('../utils/bidSendEmail');

// Route to send an email notification
router.post('/send-notification', async (req, res) => {
  const { to, subject, text, html } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).json({ error: 'Missing required fields: to, subject, text' });
  }

  try {
    await bidSendEmail(to, subject, text, html);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email' });
  }
});

module.exports = router;