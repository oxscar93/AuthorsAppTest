// dependencies
const uuid = require('uuid/v4');
const moment = require('moment');

// libs
const dynamoManager = require('../dynamoManager/dynamoManager')("author");

// static values
const typeConfig = {
  checked: 'boolean',
  description: 'regexp',
  title: 'regexp',
};

const Author = ({ id, name, email, publicationList }) => {
  const getInfo = () => ({
    id,
    name,
    email,
    publicationList
  });

  return {
    getInfo,
  };
};

// internal function
const getFromDynamo = dynamoObj => (
  Author(
    Object.assign(dynamoObj))
);

Author.update = (id, newValues) => (
  dynamoManager.retrieveOne(id)

  .then(author => (
    dynamoManager.putItem({
      info: Object.assign(getFromDynamo(author).getInfo(), newValues),
      id,
    })
  ))

  .then(author => (
    Promise.resolve(getFromDynamo(author))
  ))
);

Author.create = ({ name, email, publicationList}) => {
  const id = uuid();
  
  return dynamoManager

    .putItem({
      id,
      name,
      email,
      publicationList
    })

    .then(author => (
      Promise.resolve(getFromDynamo(author))
    ));
};

Author.retrieve = id => (
  dynamoManager.retrieveOne(id)

  .then(result => (
    Promise.resolve(getFromDynamo(result))
  ))
);

Author.retrieveAll = searchParams => (
  dynamoManager.retrieveAll(["id", "name", "email"], 
                              searchParams, typeConfig)

  .then(searchResult => (
    Promise.resolve(Object.assign(searchResult, {
      results: searchResult.results.map(result => getFromDynamo(result)),
    }))
  ))
);

Author.remove = id => (
  dynamoManager.remove(id)
);

module.exports = Author;