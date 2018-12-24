'use strict';
const addAuthor = require('./api/authors/create');
const getAuthorList = require('./api/authors/get');
const getPublicationList = require('./api/authors/getAllById');
const getAuthor = require('./api/authors/retrieveOne');
const updateAuthor = require('./api/authors/update');
const delAuthor = require('./api/authors/remove');

module.exports = {
  addAuthor,
  getAuthor,
  getPublicationList,
  getAuthorList,
  updateAuthor,
  delAuthor
};