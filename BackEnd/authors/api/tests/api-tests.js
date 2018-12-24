var request = require('supertest');
var tester = request("http://localhost:3000");

const author = {
    "name": "Robert",
    "email": "asd",	   
    "title": "something new",
    "body": "a body test",
    "publicationDate": "2001-07-07T03:00:00.000Z"
};

const authorUpdated  = {
    "name": "Robert",
    "email": "asd",
    "title": "title updated",
    "body": "a body test",
    "publicationDate": "2001-07-07T03:00:00.000Z"
};

var authorIdTest = "";
var publicationIdTest = "";

describe('POST /ADD-AUTHOR', function() {
    it('add author', function(done) {
        tester
        .post('/add-author')
        .send(author)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
 });

 describe('GET /GET-AUTHOR-LIST', function() {
    it('get all authors', function(done) {
        tester
        .get('/get-author-list')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {       
          if (err) return done(err);
          done();
          console.log(res.body);
          authorIdTest = res.body.results[0].id;
          publicationIdTest = res.body.results[0].publicationId;
        });
    });
 });

 describe('GET /GET-SINGLE-LIST', function() {
    it('get single author', function(done) {
        tester
        .get('/get-author/' + authorIdTest)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
          console.log(res.body);
        });
    });
 }); 

 describe('PUT /UPDATE-AUTHOR', function() {
    it('update author', function(done) {
        tester
        .put('/update-author/' + authorIdTest)
        .send(authorUpdated)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
          console.log(res.body);
        });
    });
 }); 

 describe('DELETE /DELETE-AUTHOR', function() {
    it('delete author', function(done) {
        tester
        .delete('/del-author/' + authorIdTest + "/" + publicationIdTest)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
          console.log(res.body);
        });
    });
 }); 


