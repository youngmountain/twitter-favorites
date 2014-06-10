'use strict';

var TwitterFavorites = require('../lib/twitter-favorites.js');
var should = require('should');
var sinon = require('sinon');

describe('twitterApi', function () {

  var twitter = null;

  beforeEach(function() {
    twitter = new TwitterFavorites({});

    sinon.stub(twitter, 'getFavoritesFromUser', function(params, cb) {
      var result = [{id:1002}, {id:1001}, {id:1000}];
      var lastId = null;

      if(params && params.max_id) {
        if(params.max_id === result.pop().id) {
          result = [];
        }
      }
      cb(null, result);
    });

  });

  afterEach(function () {
    twitter.getFavoritesFromUser.restore();
  });

  it('should return a list of all starred repos', function (cb) {

    twitter.getFavorites('username')
    .then(function(stars) {
      twitter.getFavoritesFromUser.called.should.be.true;
      stars.should.have.a.lengthOf(3);
      cb();
    }).catch(cb);
  });

  // TODO implement since_id param
  // it('should return a subset of starred repos', function (cb) {
  //   twitter.getFavorites('username', 1000)
  //   .then(function(stars) {
  //     twitter.getFavoritesFromUser.called.should.be.true;
  //     stars.should.have.a.lengthOf(2);
  //     cb();
  //   }).catch(cb);
  // });
});
