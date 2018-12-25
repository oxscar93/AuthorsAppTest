const Author = require('../../../models/Author');
const ErrorHandler = require('../../../handlers/error.handler');


module.exports = (event, context, callback) => {
  const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body || undefined;

  Author.retrieveAllByTitle(event.pathParameters.title, 
                            body)
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