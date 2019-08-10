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
} = process.env;

const client = new twilio(TWILIO_SID, TWILIO_TOKEN);

module.exports.tilDaily = async () => {
  try {
    // Get visible Trello cards
    const { data } = await axios.get(
      `https://trello.com/1/boards/${TRELLO_BOARD_ID}/cards/visible`,
      {
        params: { key: TRELLO_KEY, token: TRELLO_TOKEN },
      },
    );
    const { name: title, shortUrl } = data[random(0, data.length)];
    console.log({ title, shortUrl });

    // Send to Twilio
    const { sid, dateCreated, body } = await client.messages.create({
      body: `${title}} - ${shortUrl}`,
      to: '+19187703878',
      from: '+19184171839',
    });
    console.log({ sid, dateCreated, body });
  } catch (error) {
    throw new Error(error);
  }
};
