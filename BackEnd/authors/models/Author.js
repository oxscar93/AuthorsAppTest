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

const Author = ({ id, name, email, title, body, publicationId, date }) => {
  const getInfo = () => ({
    id,
    name,
    email,
    title,
    date,
    body,
    publicationId
  });

  return {
    getInfo,
  };
};

// internal function
const getFirstFromDynamo = dynamoObjList => (
  Author(
    Object.assign(dynamoObjList[0]))
);

const getObjFromDynamo = dynamoObj => {
 
  if (dynamoObj.date){
     dynamoObj.date= new Date(dynamoObj.date);
  }
  console.log(dynamoObj)
  return Author(
    Object.assign(dynamoObj))
}
Author.update = (id, newValues) => (
  dynamoManager.retrieveOne(id)

  .then(author => 
    (dynamoManager.putItem(
      Object.assign(getFirstFromDynamo(author).getInfo(), newValues
    ))
  ))

  .then(author => (
    Promise.resolve(getObjFromDynamo(author))
  ))
);

Author.create = ({ authorId, name, email, title, body, publicationDate}) => {
  const id = !authorId ? uuid() : authorId;
  const publicationId = uuid();
  const date = new Date(publicationDate).getTime();
 
  return dynamoManager

    .putItem({
      id,
      name,
      email,
      title,
      date,
      body,
      publicationId
    })

    .then(author => (
      Promise.resolve(getObjFromDynamo(author))
    ));
};

Author.retrieve = id => (
  dynamoManager.retrieveOne(id)

  .then(result => (
    Promise.resolve(getFirstFromDynamo(result))
  ))
);

Author.retrieveAllById = id => (
  dynamoManager.retrieveOne(id)

  .then(result => (
    Promise.resolve(result)
  ))
);

Author.retrieveSortedByDate = (id, sort) => (
  dynamoManager.retrieveSortedByDate(id, sort)

  .then(result => (
    Promise.resolve(Object.assign(result, {
      results: result.map(res => getObjFromDynamo(res)),
    }))
  ))
);

Author.retrieveAll = searchParams => (
  dynamoManager.retrieveAll(["name", "email", "id"], 
                              searchParams, typeConfig)

  .then(searchResult => (
    Promise.resolve(Object.assign(searchResult, {
      results: searchResult.results.map(result => getObjFromDynamo(result)),
    }))
  ))
);

Author.remove = (id, publicationId) => (
  dynamoManager.remove(id, publicationId)
);

module.exports = Author;