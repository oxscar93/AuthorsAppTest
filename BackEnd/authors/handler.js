'use strict';
const add = require('./api/authors/create');
const getAuthorList = require('./api/authors/get');
const getPublicationList = require('./api/authors/getAllById');
const getPublicationListByTitle = require('./api/authors/getAllByTitle');
const getAuthor = require('./api/authors/retrieveOne');
const update = require('./api/authors/update');
const del = require('./api/authors/remove');

module.exports = {
  add,
  getAuthor,
  getPublicationList,
  getPublicationListByTitle,
  getAuthorList,
  update,
  del
};