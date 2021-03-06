const aws = require('aws-sdk'); // eslint-disable-line


const dynamoDb = new aws.DynamoDB.DocumentClient({
    region: process.env.region,
    endpoint: process.env.ENDPOINT,
  });

// internal functions
const generateSearchParams = (projectParams, searchParams, typeConfig) => {
  console.log(projectParams)
  const AttributesToGet = projectParams;

  if (!AttributesToGet) return {};

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
    AttributesToGet
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
      dynamoDb.query({
        TableName,
        IndexName: 'author_idx',
        KeyConditionExpression: 'id = :value', 
        ExpressionAttributeValues: { 
          ':value': id
        },
      }, (err, result) => {
        if (err) {
          return reject({
            statusCode: 500,
            code: err.message,
          });
        }

        if (result.Items.length == 0) {
          return resolve([]);
        }

        return resolve(result.Items);
      });
    })
  );

  const retrieveSortedByDate = (id, sort) => (
    new Promise((resolve, reject) => {
      dynamoDb.query({
        TableName,
        IndexName: 'author_publication_idx', 
        KeyConditionExpression: 'id = :value', 
        ExpressionAttributeValues: { 
          ':value': id
        },
        ScanIndexForward: sort
      }, (err, result) => {
        if (err) {
          return reject({
            statusCode: 500,
            code: err.message,
          });
        }

        if (result.Items.length == 0) {
          return resolve([]);
        }
        return resolve(result.Items);
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

  const retrieveAllByTitle = (title, rowsCount, lastKey) => {
    var params= {
      TableName,
      IndexName: 'title_idx', 
      KeyConditionExpression: 'title = :value', 
      ExpressionAttributeValues: { 
        ':value': title
      },
      Limit : rowsCount,
    };
    console.log(lastKey)
    if (lastKey){
      params.ExclusiveStartKey = lastKey;
    }

    return new Promise((resolve, reject) => {
      dynamoDb.query(params, (err, result) => {
        if (err) {
          return reject({
            statusCode: 500,
            code: err.message,
          });
        }
        if (result.Items.length == 0) {
          return resolve([]);
        }
   
        return resolve({result: result.Items, lastKey: result.LastEvaluatedKey});
      });
    })
  };

  const remove = (id, publicationId) => (
    new Promise((resolve, reject) => {
      dynamoDb.delete({
        TableName,
        Key: {
          id,
          publicationId
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
    retrieveSortedByDate,
    retrieveAllByTitle
  };
};