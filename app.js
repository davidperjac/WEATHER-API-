const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.post('/', function (req, res) {
	const ciudad = req.body.cityName;
	const url_weather =
		'https://api.openweathermap.org/data/2.5/weather?q=' +
		ciudad +
		'&units=metric&appid=27a945158ca19c0e58713dedb9d555eb';
	https.get(url_weather, function (response) {
		console.log(response.statusCode);

		response.on('data', function (data) {
			const weatherData = JSON.parse(data);
			const temp = weatherData.main.temp;
			const weatherDescription = weatherData.weather[0].description;
			const icon = weatherData.weather[0].icon;
			const imageURL = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';

			res.write('<p>El clima actualmente es ' + weatherDescription + '</p>');
			res.write(
				'<h1>La temperatura en ' +
					ciudad +
					' es ' +
					temp +
					' grados Celcius</h1>'
			);
			res.write('<img src=' + imageURL + '>');
			res.send();
		});
	});
});

app.listen(3000, function () {
	console.log('Server Running on Port 3000');
});
