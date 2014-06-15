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

  before(function() {
    for (var i = 555; i > 0; i--) {
      dummyList.push({
        id: i
      });
    }
  });

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
        index = dummyList.length - found.id + 1;
      }
      result = dummyList.slice(index, index + limit);
      cb(null, null, result);
    });
  });

  afterEach(function() {
    request.get.restore();
  });

  it('should not be able to initialize without a oauth object.', function () {
    (function(){
      new TwitterFavorites();
    }).should.throw('You must provide a oauth object.');
  });

  it('should be able to initialize with oauth', function () {
    (function(){
      var oauth = {
        consumer_key: 'CONSUMER_KEY',
        consumer_secret: 'CONSUMER_SECRET',
        token: 'TOKEN',
        token_secret: 'TOKEN_SECRET'
      };
      new TwitterFavorites(oauth);
    }).should.not.throw();
  });

  it('should return a list of favorites', function(cb) {

    twitter.getFavorites('username')
      .then(function(stars) {
        request.get.called.should.be.true;
        stars.should.have.a.lengthOf(dummyList.length);
        cb();
      }).
    catch (cb);
  });
});
