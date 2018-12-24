const Author = require('../../../models/Author');
const ErrorHandler = require('../../../handlers/error.handler');

module.exports = (event, context, callback) => {
    Author.remove(event.pathParameters.id, event.pathParameters.publicationId)
  
      .then(() => {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify('Deleted.'),
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