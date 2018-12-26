# Project Title

Authors Test App By Oscar Lescano

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* Install Node JS from official page
* Install Angular-CLI and TypeScript Compiler to run the front end locally from official pages
* Install AWS-CLI and configure aws credentials (for local environment any dummy credential can be used, see notes section for further details)
* Verify you have installed Java SDK (to get dynamo db local working)
* Install serverless framework:

```
npm install -g serverless
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
	Make sure you have configured aws credentials with aws-cli in order to have access to dynamo db database

```
serverless offline start --migrate
```

* To run the front end application, run the following command (inside FrontEnd/authors)

```
ng serve
```


## Running the tests

To run Backend tests, please ensure you have the server up and execute the following command (inside Backend/authors):

```
npm test
```

## Deployment

By default, the project was configured to run locally, but you can change variables via serverless.yml file. 

Some main variables are:

* dynamo db region and enpoint. 
* dynamo db table name. 
* lambda regions and stages


## Notes

* To test pagination, please search "Global warming" as according with test data. 
    The search by title criteria will work only with equal comparation of some title, in order to avoid using scan method and improve performance. 

* To configure aws credentials, you can follow the next steps taken from aws official docs:

	Run aws configure

	The following information will be asked: 

	* AWS Access Key ID [None]: AKIAIOSFODNN7EXAMPLE -- you can put this literal example
	* AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY -- you can put this literal example
	* Default region name [None]: local
	* Default output format [None]: ENTER