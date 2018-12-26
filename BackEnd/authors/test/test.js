var request = require('supertest');
var tester = request("http://localhost:3000");

const author = {
    "name": "Robert",
    "email": "asd",	   
    "title": "something new",
    "body": "a body test",
    "publicationDate": "2001-07-07T03:00:00.000Z",
    "authorBirthDate": "1992-07-07T03:00:00.000Z"
};

const authorUpdated  = {
    "name": "Robert",
    "email": "asd",
    "title": "title updated",
    "body": "a body test",
    "publicationDate": "2001-07-07T03:00:00.000Z",
    "authorBirthDate": "1992-07-07T03:00:00.000Z"
};

var authorIdTest = "";
var publicationIdTest = "";

describe('POST /ADD', function() {
    it('add', function(done) {
        tester
        .post('/add')
        .send(author)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
 });

 describe('POST /WRONG ADD', function() {
    it('add', function(done) {
        tester
        .post('/add')
        .send(null)
        .set('Accept', 'application/json')
        .expect(500)
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

 describe('GET /WRONG GET-AUTHOR-LIST', function() {
    it('get all authors', function(done) {
        tester
        .get('/get-author-wrongurl')
        .set('Accept', 'application/json')
        .expect(404)
        .end(function(err, res) {       
          if (err) return done(err);
          done();
        });
    });
 });

 describe('GET /ALL PUBLICATIONS BY AUTHOR ID', function() {
    it('get all by id', function(done) {
        tester
        .get('/get-publication-list/' + authorIdTest + "/" + false)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
          console.log(res.body);
        });
    });
 }); 

 describe('GET /WRONG ALL PUBLICATIONS BY AUTHOR ID', function() {
    it('get all by id', function(done) {
        tester
        .get('/get-publication-list/')
        .set('Accept', 'application/json')
        .expect(404)
        .end(function(err, res) {
          if (err) return done(err);
          done();
          console.log(res.body);
        });
    });
 }); 

 describe('GET /ALL PUBLICATIONS BY TITLE', function() {
    it('get all by id', function(done) {
        tester
        .post('/get-publication-list-by-title/' + "title updated")
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
          console.log(res.body);
        });
    });
 })

 describe('GET /WRONG ALL PUBLICATIONS BY TITLE', function() {
    it('get all by id', function(done) {
        tester
        .post('/get-publication-list-by-title/')
        .set('Accept', 'application/json')
        .expect(404)
        .end(function(err, res) {
          if (err) return done(err);
          done();
          console.log(res.body);
        });
    });
 })

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

 describe('GET /WRONG GET-SINGLE-LIST', function() {
    it('get single author', function(done) {
        tester
        .get('/get-author/')
        .set('Accept', 'application/json')
        .expect(404)
        .end(function(err, res) {
          if (err) return done(err);
          done();
          console.log(res.body);
        });
    });
 }); 

 describe('PUT /UPDATE', function() {
    it('update', function(done) {
        tester
        .put('/update/' + authorIdTest)
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

 describe('PUT /WRONG UPDATE', function() {
    it('update', function(done) {
        tester
        .put('/update/')
        .send(authorUpdated)
        .set('Accept', 'application/json')
        .expect(404)
        .end(function(err, res) {
          if (err) return done(err);
          done();
          console.log(res.body);
        });
    });
 });

 describe('DELETE /DELETE', function() {
    it('delete', function(done) {
        tester
        .delete('/del/' + authorIdTest + "/" + publicationIdTest)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
          console.log(res.body);
        });
    });
}); 

describe('DELETE /WRONG DELETE', function() {
    it('delete', function(done) {
        tester
        .delete('/del/')
        .set('Accept', 'application/json')
        .expect(404)
        .end(function(err, res) {
          if (err) return done(err);
          done();
          console.log(res.body);
        });
    });
}); 


