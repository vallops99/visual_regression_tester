import cors from "cors";
import express from "express";
import bodyParser from "body-parser";

import { Tester } from "src/Tester";

const PORT = process.env.TESTER_PORT;

const app = express();
const tester = new Tester();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('./static'));

app.post('/launch-tests', async function(request, response) {
	if (!tester.areTestsDone) {
		tester.testsRestarted = true;
	}

	tester.launchTests();

	response.send(JSON.stringify({
		message: 'Tests started'
	}));
});

app.get('/get-test', function(request, response) {
    const tests = tester.tests.filter(t => t.done || t.pending);
    const areInvalid = tests.some(test => test.hasDiff);

	response.send(JSON.stringify({
        tests,
        areInvalid
    }));
});

app.get('/get-test/:name', function(request, response) {
	const test = tester.tests.find(test => {
		return request.params.name && test.name === request.params.name;
	});

	if (test) {
		return response.send(JSON.stringify(test));
	}

	return response.status(404).send(JSON.stringify({
		error: "Test not found"
	}));
});

app.post('/set-tests', function(request, response) {
	try {
		console.log(request.body);
		tester.saveTests(request.body);
		response.send();
	} catch(err) {
		response.status(400).send(JSON.stringify({
			data: err
		}));
	}
});

app.get('/get-notifications', function(request, response) {
	// const tests = tester.tests.filter(test => {
	// 	if (test.notified) return false;

	// 	test.notified = test.done;
	// 	return test.done;
	// });

	response.send(JSON.stringify({
		areTestsDone: tester.areTestsDone
	}));
});

app.listen(PORT, () => {
	console.log(`Node running on http://localhost:${PORT}`);
});
