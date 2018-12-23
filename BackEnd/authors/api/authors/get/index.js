const Author = require('../../../models/Author');
const ErrorHandler = require('../../../handlers/error.handler');

module.exports = (event, context, callback) => {
 
  Author.retrieveAll(event.queryStringParameters || {})
 
  .then((searchResult) => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(Object.assign(searchResult, {
        results: searchResult.results.map(result => result.getInfo()),
      })),
    });
  })

  .catch(err => (
    ErrorHandler.handle(err)
  ))

  .catch(err => (
    setTimeout(() => (
      err.send(callback)
    ))
  ));
};