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
  consumer_key: 'RBWHCeswinl48avYevcwjw',
  consumer_secret: '8M2dydAq4NtEpChgR9Tmh4UxJVrZgFTKs4Dv6PjQc',
  token: '104607981-KuKnYviZwqnXNFOTpSYqhm0LTRnf9mRwJScd1Xj9',
  token_secret: 'kJvwcU7B5XPfakac8Fm1E5cJo7bigoJABzkZ5ZvPEUIec'
};

var twitter = new TwitterFavorites(oauth);

twitter.getFavorites('zucchinies').then(function(result) {
  console.log(result.length);
}).catch(function(err) {
  console.log(err);
});
