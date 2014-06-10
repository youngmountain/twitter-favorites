/*
 * twitter-favorites
 * https://github.com/kwakayama/twitter-favorites
 *
 * Copyright (c) 2014 Kentaro Wakayama
 * Licensed under the MIT license.
 */

'use strict';

var TwitterFavorites = require('../');

var oauth = {
  consumer_key: 'CONSUMER_KEY',
  consumer_secret: 'CONSUMER_SECRET',
  token: 'TOKEN',
  token_secret: 'TOKEN_SECRET'
};

var twitter = new TwitterFavorites(oauth);

twitter.getFavorites('kwakayama').then(function(result) {
  console.log(result);
}).catch(function(err) {
  console.log(err);
})
