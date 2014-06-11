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

  for (var i = 500; i >= 0; i--) {
    dummyList.push({
      id: i
    });
  }

  beforeEach(function() {
    twitter = new TwitterFavorites({});
    sinon.stub(request, 'get', function(params, cb) {
      var result = [];
      var urlData = url.parse(params.url);
      var queryParams = querystring.parse(urlData.query);
      var limit = parseInt(queryParams.count, 10);
      var index;

      if (!queryParams.max_id) {
        index = 0;
      } else {
        var maxId = parseInt(queryParams.max_id, 10);
        var found = _.findWhere(dummyList, {
          id: maxId
        });
        index = dummyList.length - found.id;
      }
      result = dummyList.slice(index, index + limit);
      cb(null, null, result);
    });
  });

  afterEach(function() {
    request.get.restore();
  });

  it('should return a list of all favorites', function(cb) {

    twitter.getFavorites('username')
      .then(function(stars) {
        request.get.called.should.be.true;
        stars.should.have.a.lengthOf(dummyList.length);
        cb();
      }).
    catch (cb);
  });

  it('should return a subset of favorites', function (cb) {

    twitter.getFavorites('username', dummyList.length - 50)
      .then(function(stars) {
        request.get.called.should.be.true;
        stars.should.have.a.lengthOf(49);
        cb();
      }).
    catch (cb);
  });

  it('should return a subset of favorites', function (cb) {

    twitter.getFavorites('username', dummyList.length - 450)
      .then(function(stars) {
        request.get.called.should.be.true;
        stars.should.have.a.lengthOf(449);
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
});
