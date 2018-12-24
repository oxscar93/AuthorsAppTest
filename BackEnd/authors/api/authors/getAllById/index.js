const Author = require('../../../models/Author');
const ErrorHandler = require('../../../handlers/error.handler');


module.exports = (event, context, callback) => {
  Author.retrieveSortedByDate(event.pathParameters.id, event.pathParameters.sort)

    .then((result) => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(result),
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