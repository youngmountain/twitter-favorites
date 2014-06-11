'use strict';

var url = require('url');
var querystring = require('querystring');
var TwitterFavorites = require('../lib/twitter-favorites.js');
var sinon = require('sinon');
var request = require('request');
var should = require('should');
var _ = require('lodash');

describe('twitterApi', function() {

  var twitter = null;
  var dummyList = [];

  // for (var i = 500 - 1; i >= 0; i--) {
  //   dummyList.push({
  //     id: 1000 + i
  //   });
  // }

  for (var i = 0; i < 500; i++) {
    dummyList.push({
      id: 1000 + i
    });
  }

  beforeEach(function() {
    twitter = new TwitterFavorites({});
    sinon.stub(request, 'get', function(params, cb) {
      var result = [];
      var urlData = url.parse(params.url);
      var queryParams = querystring.parse(urlData.query);
      console.log(queryParams);
      var limit = queryParams.count;
      var index;
      if (!queryParams.max_id) {
        index = 0;
      } else {
        var maxId = parseInt(queryParams.max_id, 10);
        var found = _.findWhere(dummyList, {
          id: maxId
        });
        index = found.id - 1000 + 1;
      }
      result = dummyList.slice(index, index + limit);
      cb(null, null, result);
    });
  });

  afterEach(function() {
    request.get.restore();
  });

  it('should return a list of all starred repos', function(cb) {

    twitter.getFavorites('username')
      .then(function(stars) {
        request.get.called.should.be.true;
        request.get.calledThrice.should.be.true;
        stars.should.have.a.lengthOf(500);
        cb();
      }).
    catch (cb);
  });

  it('should throw an error when no username is given', function() {
    (function() {
      twitter.getFavorites();
    }).should.
    throw ('You must provide a user.');
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
