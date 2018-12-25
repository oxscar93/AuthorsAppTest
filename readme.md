# Project Title

Authors Test App By Oscar Lescano

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* Install Node JS from official page
* Install Angular-CLI and TypeScript Compiler to run the front end locally from official pages

* Install serverless framework:

```
npm install -g serverless
```

* Install serverless plugins to run the backend and dynamo db locally:

```
npm install --save serverless-dynamodb-local
```

```
npm install serverless-offline
```

### Installing

* After cloning the project, follow these next steps:

	Run the following command to install node dependencies in both projects (Backend/authors and FrontEnd/authors) 

```
npm install
```

Run the project:

* After installing node dependencies, first run the backend service with the following command (inside Backend/authors folder):

	With this command, the server and dynamo db local database will be automatically started with test data.

```
serverless offline start --migrate
```

* To run the front end application, run the following command (inside FrontEnd/authors)

```
ng serve
```


## Running the tests

To run Backend tests, please ensure you have the server up and execute the following command (inside Backend/authors/api/tests):

```
mocha api-tests.js
```

## Deployment

By default, the project was configured to run locally, but you can change variables via serverless.yml file. 

Some main variables are:

* dynamo db region and enpoint. 
* dynamo db table name. 
* lambda regions and stages


## Notes

To test pagination, please search "Global warming" as according with test data. 
The search by title criteria will work only with equal comparation of some title, in order to avoid using scan method and improve performance. 

