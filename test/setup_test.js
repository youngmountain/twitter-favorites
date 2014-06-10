'use strict';

var Twitter = require('../');
var assert = require('should');

describe('setup', function () {

  it('should not be able to initialize without a oauth object.', function () {
    (function(){
      new Twitter();
    }).should.throw('You must provide a oauth object.')
  });

  it('should be able to initialize with oauth', function () {
    (function(){
      var oauth = {
        consumer_key: 'CONSUMER_KEY',
        consumer_secret: 'CONSUMER_SECRET',
        token: 'TOKEN',
        token_secret: 'TOKEN_SECRET'
      };
      new Twitter(oauth);
    }).should.not.throw();
  });

});
