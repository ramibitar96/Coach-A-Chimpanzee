var express = require('express');
var app = express();

// Whenever someone requests any file, we respond with "Hello World"
app.get('/', function (req, res)
{
	res.send('Hello World!');
});

app.listen(3000, function()
{
	console.log('Listening on port 3000!');
});