'use strict';
const {
  TWILIO_SID,
  TWILIO_TOKEN,
  TRELLO_BOARD_ID,
  TRELLO_KEY,
  TRELLO_TOKEN,
} = process.env;
const request = require('request');
const random = require('lodash.random');
const client = new require('twilio')(TWILIO_SID, TWILIO_TOKEN);

module.exports.tilDaily = async () =>
  request(
    {
      method: 'GET',
      url: `https://trello.com/1/boards/${TRELLO_BOARD_ID}/cards/visible`,
      qs: { key: TRELLO_KEY, token: TRELLO_TOKEN },
      headers: { 'cache-control': 'no-cache' },
    },
    (err, res, body) => {
      if (err) throw new Error(err);
      const parsed = JSON.parse(body);
      const { name: title, shortUrl } = parsed[random(0, parsed.length)];

      // Send to Twilio
      client.messages
        .create({
          body: `${title}} - ${shortUrl}`,
          to: '+19187703878',
          from: '+19184171839',
        })
        .then(({ sid }) => {
          return {
            statusCode: 200,
            body: JSON.stringify({ sid }, null, 2),
          };
        });
    },
  );
