# til-daily
AWS Lambda + Trello + Twilio to send a daily SMS with one TIL Programming task

Using AWS Lambda, this simple function:
- queries my TIL-Programming Trello board for all visible tasks
- randomly chooses one
- sends an SMS message via Twilio with the title and url
