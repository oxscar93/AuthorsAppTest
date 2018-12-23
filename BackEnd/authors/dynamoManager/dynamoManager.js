const aws = require('aws-sdk'); // eslint-disable-line

const dynamoDb = new aws.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000',
  });

// internal functions
const generateSearchParams = (projectParams, searchParams, typeConfig) => {
  console.log(projectParams)
  const AttributesToGet = projectParams;

  if (Object.keys(searchParams).length === 0) {
    return {AttributesToGet};
  }

  const FilterExpression = Object.keys(searchParams).map(key => (
    typeConfig[key] === 'regexp' ? `begins_with(info.${key}, :${key})` : `info.${key} = :${key}`
  )).join(' and ');

  const ExpressionAttributeValues = Object.keys(searchParams).map(key => ({
    [':' + key]: typeConfig[key] === 'boolean' ? searchParams[key] === 'true' : searchParams[key],
  })).reduce((a, b) => (
    Object.assign(a, b)
  ), {});

  return {
    FilterExpression,
    ExpressionAttributeValues,
    ProjectionExpression
  };
};

module.exports = (TableName) => {
  const putItem = item => (
    new Promise((resolve, reject) => {
      dynamoDb.put({
        TableName,
        Item: item,
      }, (err) => {
        if (err) {
          return reject({
            statusCode: 500,
            code: err.message,
          });
        }

        return resolve(item);
      });
    })
  );

  const retrieveOne = id => (
    new Promise((resolve, reject) => {
      dynamoDb.get({
        TableName,
        Key: {
          id,
        },
      }, (err, result) => {
        if (err) {
          return reject({
            statusCode: 500,
            code: err.message,
          });
        }

        if (!result.Item) {
          return reject({
            statusCode: 404,
            code: 'Not foud.',
          });
        }

        return resolve(result.Item);
      });
    })
  );

  const retrieveAll = (projectParams, searchOptions, typeConfig) => (
    new Promise((resolve, reject) => {
      dynamoDb.scan(Object.assign(generateSearchParams(projectParams, searchOptions, typeConfig), {
        TableName,
      }), (err, result) => {
        if (err) {
          return reject({
            statusCode: 500,
            code: err.message,
          });
        }

        return resolve({
          results: result.Items,
          hits: result.ScannedCount,
        });
      });
    })
  );

  const remove = id => (
    new Promise((resolve, reject) => {
      dynamoDb.delete({
        TableName,
        Key: {
          id,
        },
      }, (err, result) => {
        if (err) {
          return reject({
            statusCode: 500,
            code: err.message,
          });
        }

        return resolve(result);
      });
    })
  );

  return {
    putItem,
    remove,
    retrieveAll,
    retrieveOne,
  };
};