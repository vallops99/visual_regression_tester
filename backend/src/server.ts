import cors from "cors";
import express from "express";
import bodyParser from "body-parser";

import { Tester } from "src/Tester";
import { Console } from "console";

const app = express();
const tester = new Tester();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("./static"));

app.post("/launch-tests", function(request, response) {
	if (!tester.areTestsDone) {
		tester.testsRestarted = true;
	}

	tester.launchTests();

	response.send(JSON.stringify({
		message: "Tests started"
	}));
});

app.post("/launch-test/:name", function(request, response) {
	response.send(JSON.stringify({
		message: "Test started"
	}));
});

app.get("/get-tests", async function(request, response) {
    const tests = await tester.getTests({ showable: true });
    const areInvalid = tests.some(test => test.hasDiff);

	response.send(JSON.stringify({
        tests,
        areInvalid
    }));
});

app.get("/get-test/:name", async function(request, response) {
	const test = await tester.getTest(request.params.name);

	if (test) {
		return response.send(JSON.stringify(test));
	}

	return response.status(404).send(JSON.stringify({
		error: "Test not found"
	}));
});

app.post("/set-tests", async function(request, response) {
	try {
		await tester.saveTests(request.body);
		response.send();
	} catch(err) {
		response.status(400).send(JSON.stringify({
			data: err
		}));
	}
});

app.get("/get-notifications", async function(request, response) {
	const testsTerminated = await tester.getTests({ notifiable: true });

	response.send(JSON.stringify({
		areTestsDone: tester.areTestsDone,
		testsToReload: testsTerminated
	}));

	for (const test of testsTerminated) {
		test.notified = true;
	}

	tester.updateTests(testsTerminated);
});

app.listen(process.env.BACKEND_PORT, () => {
	console.log(`Node running on http://localhost:${process.env.BACKEND_PORT}`);
});

export default app;