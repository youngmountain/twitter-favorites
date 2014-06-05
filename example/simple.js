/*
 * twitter-favorites
 * https://github.com/kwakayama/twitter-favorites
 *
 * Copyright (c) 2014 Kentaro Wakayama
 * Licensed under the MIT license.
 */

'use strict';

var twitterFavorites = require('../');

var oauth = {
  consumer_key: 'CONSUMER_KEY',
  consumer_secret: 'CONSUMER_SECRET',
  token: 'TOKEN',
  token_secret: 'TOKEN_SECRET'
};

twitterFavorites('kwakayama', oauth, function(err, result) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(result);
});
