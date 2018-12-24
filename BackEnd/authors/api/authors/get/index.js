const Author = require('../../../models/Author');
const ErrorHandler = require('../../../handlers/error.handler');

const removeDuplicates = (arr) =>{
  var uniqueArray=[];
  for(var i=0; i < arr.length; i++){
      if(uniqueArray.filter(e => e.id == arr[i].id).length == 0){
          uniqueArray.push(arr[i]);
      }
  }
  return uniqueArray; 
}

module.exports = (event, context, callback) => {
 
  Author.retrieveAll(event.queryStringParameters || {})
 
  .then((searchResult) => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(Object.assign(searchResult, {
        results: removeDuplicates(searchResult.results.map(result => result.getInfo())),
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