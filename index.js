const express = require('express');
const bodyParser = require('body-parser');
const api = require('vk-easy');
require('dotenv').load();

const app = express();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.json());


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
        color: 'default'
      }
    ],
    [
      {
        action: {
          type: 'text',
          payload: '{"button": "2"}',
          label: 'Составление документов'
        },
        color: 'default'
      }
    ],
    [
      {
        action: {
          type: 'text',
          payload: '{"button": "3"}',
          label: 'Ведение дела'
        },
        color: 'default'
      }
    ],
    [
      {
        action: {
          type: 'text',
          payload: '{"button": "4"}',
          label: 'Прайс-лист'
        },
        color: 'default'
      }
    ]
  ]
  });


app.post('/', urlencodedParser, function(req, res) {
//console.log(req.body);
	switch(req.body.type) {
		case 'confirmation':
			res.send('bca0785a');
			break;
		case 'message_new':
			console.log(req.body);

      switch (req.body.object.body) {
        case 'Консультация':
          answer(req.body.object.user_id, 'По теме "Консультация" я пока ничего не знаю');
          break;
        case 'Составление документов':
          answer(req.body.object.user_id, 'По теме "Составление документов" я пока ничего не знаю');
          break;
        case 'Ведение дела':
          answer(req.body.object.user_id, 'По теме "Ведение дела" я пока ничего не знаю');
          break;
        case 'Прайс-лист':
          answer(req.body.object.user_id, 'Мы предоставляем услуги:\n' +
                                           '1) Составление претензий - 1000 руб.\n' +
                                           '2) Написание исковых заявлений - 1000 руб.\n' +
                                           '3) Обжалование действий приставов - 1000 руб.\n' +
                                           '4) Взыскание дебиторской задолженности - 1000 руб.\n' +
                                           '5) Неустойка с застройщика - 1000 руб.\n' +
                                           '6) Взыскание долга по расписке - 1000 руб.\n' +
                                           '7) Взыскание ущерба при ДТП/страховое возмещение - 1000 руб.\n' +
                                           '8) Ведение бракоразводного процесса - 1000 руб.\n' +
                                           '9) Взыскание алиментов - 1000 руб.');
          break;
        default:
          answer(req.body.object.user_id, 'Не понимаю вашего запроса, попробуйте воспользоваться предложенными кнопками');
      }

			
			res.send('ok');
			break;

		default:
			res.send('ok');
			break;
	}

});

function answer(user_id, message) {
    api('messages.send', { 
          user_id: user_id,
          message: message,
          access_token: process.env.TOKEN,
          keyboard
      }).then(console.log);
}



app.listen(process.env.PORT);