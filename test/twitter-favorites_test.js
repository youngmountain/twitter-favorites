'use strict';

var twitterFavorites = require('../lib/twitter-favorites.js');
var assert = require('should');

describe('twitterFavorites', function () {

  it('should not be able to initialize without a username.', function () {
    (function(){
      twitterFavorites();
    }).should.throw('You must provide a username.')
  });

  it('should not be able to initialize without a oauth object.', function () {
    (function(){
      twitterFavorites('username');
    }).should.throw('You must provide a oauth object.')
  });
});
