const Author = require('../../../models/Author');
const ErrorHandler = require('../../../handlers/error.handler');


module.exports = (event, context, callback) => {
  Author.retrieve(event.pathParameters.id)

    .then((author) => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(author.getInfo()),
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