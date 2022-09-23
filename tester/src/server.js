'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const testerJs = require('./tester.js');

const PORT = process.env.TESTER_PORT;
const HOST = '0.0.0.0';

const app = express();
const tester = new testerJs.Tester();

app.use(bodyParser.json());
app.use(express.static('./static'));
app.use(express.static('./node_modules'));

app.post('/launch-tests', async function(request, response) {
	if (!tester.areTestsDone) {
		tester.testsRestarted = true;
	}

	tester.launchTests();

	response.send(JSON.stringify({
		message: 'Tests started'
	}));
});

app.get('/get-tests', function(request, response) {
	let tests = tester.tests;
	if (request.query.name) {
		tests = tests.filter(test => request.query.name.includes(test.name));
	}

	tests.forEach(test => {
		const testStatus = tester.testsStatus[test.name];
		test.pending = testStatus.pending;
		test.error = testStatus.error;
	})

	response.send(JSON.stringify(tests));
});

app.post('/set-tests', function(request, response) {
	tester.tests = request.body;

	response.send(JSON.stringify({ message: 'Tests updated' }));
});

app.get('/get-notifications', function(request, response) {
	const testsNames = [];
	const testsStatus = tester.testsStatus;

	Object.keys(tester.testsStatus).forEach(testKey => {
		if (testsStatus[testKey].done && !testsStatus[testKey].notified) {
			testsStatus[testKey].notified = true;
			testsNames.push(testKey);
		}
	});

	response.send(JSON.stringify({
		areTestsDone: tester.areTestsDone,
		testsNames
	}));
});

app.listen(PORT, HOST);
console.log(`Node running on http://${HOST}:${PORT}`);
