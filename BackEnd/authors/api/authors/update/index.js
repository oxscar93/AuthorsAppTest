const Author = require('../../../models/Author');
const ErrorHandler = require('../../../handlers/error.handler');

module.exports = (event, context, callback) => {
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body || {};
  
    Author.update(event.pathParameters.id, body)
  
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