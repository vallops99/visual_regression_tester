import cors from "cors";
import express from "express";
import bodyParser from "body-parser";

import { Tester } from "src/Tester";
import { BaseTest } from "./utils";

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

	return response.send(JSON.stringify({
		message: "Tests started"
	}));
});

// app.post("/launch-test/:name", function(request, response) {
// 	return response.send(JSON.stringify({
// 		message: "Test started"
// 	}));
// });

app.get("/get-tests", async function(request, response) {
    const tests = await tester.getTests();
	const areInvalid = tests.some(test => test.hasDiff);

	return response.send(JSON.stringify({
        tests,
        areInvalid
    }));
});

app.get("/get-test/:name", async function(request, response) {
	try {
		const test = await tester.getTest(request.params.name);

		if (!test) {
			throw Error("Test not found");
		}

		return response.send(JSON.stringify(test));
	} catch(err) {
		return response.status(404).send(JSON.stringify({
			error: err
		}));
	}
});

app.put("/set-tests", async function(request, response) {
	try {
		await tester.saveTests(request.body);
		return response.send(JSON.stringify({
			msg: "Test updated"
		}));
	} catch(err) {
		return response.status(400).send(JSON.stringify({
			error: err
		}));
	}
});

app.get("/get-notifications", async function(request, response) {
	const testsTerminated = await tester.getTests(true);

	response.send(JSON.stringify({
		areTestsDone: tester.areTestsDone,
		testsToReload: testsTerminated
	}));

	for (const test of testsTerminated) {
		test.notified = true;
	}

	tester.updateTests(testsTerminated);
});

app.post("/create-test", async function(request, response) {
	try {
		const test: BaseTest = {
			name: request.body.name || "",
			steps: request.body.steps || [],
			isLogin: request.body.isLogin || false,
			needsLogin: request.body.needsLogin || false,
			orderNumber: request.body.orderNumber || 0,
		};

		if (!test.name.length) {
			throw Error("Test is missing a name");
		}

		await tester.createTest(test);

		return response.send(JSON.stringify({
			msg: "Test created"
		}));
	} catch(err) {
		return response.status(400).send(JSON.stringify({
			error: err
		}));
	}
});

// [TODO] add test edit to frontend
app.put("/edit-test", async function(request, response) {
	try {
		await tester.editTests(request.body);

		return response.send(JSON.stringify({
			msg: "Test edited"
		}));
	} catch(err) {
		return response.status(400).send(JSON.stringify({
			error: err
		}));
	}
});

app.delete("/delete-test", async function(request, response) {
	try {
		await tester.deleteTest(request.body);

		response.send(JSON.stringify({
			msg: "Test deleted"
		}));
	} catch(err) {
		return response.status(400).send(JSON.stringify({
			error: err
		}));
	}
});

app.post("/set-step", async function(request, response) {
	try {
		await tester.updateOrCreateStep(request.body);

		return response.send(JSON.stringify({
			msg: "Step edited/created"
		}));
	} catch(err) {
		return response.status(400).send(JSON.stringify({
			error: err
		}));
	}
});

app.put("/reorder-steps", async function(request, response) {
	try {
		await tester.reorderSteps(request.body);

		return response.send(JSON.stringify({
			msg: "Step reordered"
		}));
	} catch(err) {
		return response.status(400).send(JSON.stringify({
			error: err
		}))
	}
});

app.delete("/delete-step", async function(request, response) {
	try {
		await tester.deleteStep(request.body);

		return response.send(JSON.stringify({
			msg: "Step deleted"
		}));
	} catch(err) {
		return response.status(400).send(JSON.stringify({
			error: err
		}));
	}
});

app.get("/get-last-step-id", async function(request, response) {
	try {
		return response.send(JSON.stringify(
			await tester.getLastStepId() || 0
		));
	} catch(err) {
		return response.status(400).send(JSON.stringify({
			errro: err
		}));
	}
});

app.listen(process.env.BACKEND_PORT, () => {
	console.log(`Node running on http://localhost:${process.env.BACKEND_PORT}`);
});

export default app;