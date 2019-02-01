const express = require('express');
const bodyParser = require('body-parser');
const api = require('vk-easy');
require('dotenv').load();

const app = express();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.json());

app.get('/', function(req, res) {
	//console.log(req.body);
    res.send('Denis');
});


const keyboard = JSON.stringify({
  one_time: false,
  buttons: [
    [
      {
        action: {
          type: 'text',
          payload: '{"button": "1"}',
          label: 'Консультация'
        },
        color: 'negative'
      }
    ],
    [
      {
        action: {
          type: 'text',
          payload: '{"button": "2"}',
          label: 'Помощь с документами'
        },
        color: 'positive'
      }
    ],
    [
      {
        action: {
          type: 'text',
          payload: '{"button": "3"}',
          label: 'Найм адвоката'
        },
        color: 'default'
      }
    ],
    [
      {
        action: {
          type: 'text',
          payload: '{"button": "4"}',
          label: 'Другое'
        },
        color: 'primary'
      }
    ]
  ]
  });

api('messages.send', { 
  				domain: 'gr__nayaa',
  				message: 'приветики',
  				access_token: process.env.TOKEN,
  				//keyboard
			}).then(console.log);


app.post('/', urlencodedParser, function(req, res) {

	switch(req.body.type) {
		case 'confirmation':
			res.send('bca0785a');
			break;
		case 'message_new':
			console.log(req.body);
			api('messages.send', { 
  				user_id: req.body.object.user_id,
  				message: req.body.object.body,
  				access_token: process.env.TOKEN,
  				keyboard
			}).then(console.log);
			res.send('ok');
			break;
		default:
			res.send('ok');
			break;
	}

});

app.listen(process.env.PORT);