'use strict';
const random = require('lodash.random');
const axios = require('axios');
const twilio = require('twilio');

const {
  TWILIO_SID,
  TWILIO_TOKEN,
  TRELLO_BOARD_ID,
  TRELLO_KEY,
  TRELLO_TOKEN,
  MY_PHONE_NUMBER,
  TWILIO_PHONE_NUMBER,
} = process.env;

const client = new twilio(TWILIO_SID, TWILIO_TOKEN);

module.exports.tilDaily = async () => {
  try {
    // Get visible Trello cards
    const url = `https://trello.com/1/boards/${TRELLO_BOARD_ID}/cards/visible`;
    const params = { key: TRELLO_KEY, token: TRELLO_TOKEN };
    const { data } = await axios.get(url, { params });
    console.log(`Successfully retrieved ${data.length} active Trello tasks`);

    // Get random Trello task
    const { name, shortUrl } = data[random(0, data.length)];

    // Send SMS via Twilio
    const message = `${name}} - ${shortUrl}`;
    await client.messages.create({
      body: message,
      to: MY_PHONE_NUMBER,
      from: TWILIO_PHONE_NUMBER,
    });
    console.log(`Successfully sent SMS message`);
  } catch (error) {
    throw new Error(error);
  }
};
