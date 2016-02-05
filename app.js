'use strict';

// Handle unix timestamps and natural language dates.
// Note: Dates in JS report millisecond values, remember unix
// timestamps are in SECONDS.

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.set('views', './views');
app.set('view engine', 'jade');

app.get('/', (req, res) => {
	// Send some instructions
	res.render('index');
});

app.get('/:date', (req, res) => {
	let unix = Number(req.params.date) ? true : false;
	
	// Make our life a little easier
	let formatter = new Intl.DateTimeFormat('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	});

	let obj = { };
	let date;
	
	if (unix) {
		// Convert unix timestamp to milliseconds
		date = new Date(Number(req.params.date) * 1000);
		obj.unix = Number(req.params.date);
	} else {
		date = new Date(req.params.date);
		// Extract seconds
		obj.unix = date.getTime() / 1000 | 0;
	}
	
	obj.natural = date.toString() !== 'Invalid Date' ? formatter.format(date) : null;

	res.json(obj);
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});