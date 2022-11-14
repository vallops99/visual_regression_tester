# Visual regression tester


## Intro
This tool is useful for creating visual regression tests.
Basically it creates an API (node webserver) at the port you specify in the .env file (create one if you did not yet) with a ready Postgres instance.

## Build the server
In order to build the server you must crate an `.env` file in the main folder of the test (checkout the `.env_sample` for reference).<br>
Then just type `docker-compose up --build backend` and docker will build the image and take up a container ready to use.

## How test works
Tests can be created through the API endpoint or by building and taking up the frontend image.
You can create N tests, there are no limits, just bear in mind that there is no pagination on the frontend, so they will be loaded all at once.<br>
When you hit the "Launch tests" button on the frontend, it will make a request to `/launch-tests` (this means that you can avoid the frontend step if you're using the API only), the server will start the tests asynchronously and reply with `200` `{ message: "Test started" }`.<br>
Test are made with Puppeteer library, it basically starts an headless Chrome browser and executes the tests that you created.

## Setup API
You can setup your API through the settings on the frontend or through the API at the endpoint `/setup-env`.
With this setup you can define your start URL, the first test will start its journey from the URL X (this is used to avoid making the first step of the first test a GOTO xyz URL),
the main folder where the images will be stored and the threshold to use in order to consider two images different.

## Create a test
You can create a test through the frontend by clicking the green plus button at the bottom of the main page, or by sending a POST request to `/create-test`;
In order to work a test needs a unique name, empty or already existing name will not be accepted; steps are optional, if you just need a screenshot of your first page load, just create the test and stop, if you need to change the url you can use the GOTO steps.


### UNDER CONSTRUCTION --- WILL UPDATE SOON
### Tests dictionary
This dictionary describe a single test and it's composed by three property:
- `name`, [ REQUIRED ] this property will be used as name of the test, name of the folder that stores the images and main name of the images files.
- `needsLogin`, [ OPTIONAL ] this property describes whether the test does need a logged-in session or not, if it does, a login function will be launched and it will let the test continue.
- `steps`, [ OPTIONAL ] this property is an array of dictionaries, each of them describe a single step to execute during the test, when the steps are all executed succesfully a screenshot will be taken. The dictionary's property are described below.

### Steps dictionary
This dictionary describe a single step of a test and it's composed by three property:
- `action`, [ REQUIRED ] this property describe the name of function to be executed on the page instance (page is a class of Puppeteer, [checkout its methods](https://pptr.dev/api/puppeteer.page._/) to understand all the possible actions that you can do).
- `value`, [ REQUIRED ] this property is the value to pass to the action (basically to the function of the page instance), always refer to the [Page class documentation of Puppeteer](https://pptr.dev/api/puppeteer.page._/) to understand which value you can use.
- `options`, [ OPTIONAL ] this property is a dictionary that describes the options to be passed to action (basically to the function of the page instance), always refer to the [Page class documentation of Puppeteer](https://pptr.dev/api/puppeteer.page._/) to understand which options you can use.