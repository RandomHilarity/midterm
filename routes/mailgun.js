//mailgun
const api_key = '701787b89792b1d8973963c4c492240f-19f318b0-11d095c3'; //private key
const domain = "sandboxdd17903047934a6e95f66caa3dfedf64.mailgun.org";
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
 
const pollCreated = {
  from: 'Devon <devon.blake@live.com>',
  to: 'devon.blake@live.com',
  subject: 'Hello world',
  text: 'Testing some Mailgun awesomeness!'
};
 
mailgun.messages().send(pollCreated, function (error, body) {
  if (error) {
    console.log(error);
  }
  console.log(body);
});