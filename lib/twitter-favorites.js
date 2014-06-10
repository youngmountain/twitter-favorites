/*
 * twitter-favorites
 * https://github.com/kwakayama/twitter-favorites
 *
 * Copyright (c) 2014 Kentaro Wakayama
 * Licensed under the MIT license.
 */

'use strict';

var request = require('request'),
  _ = require('lodash'),
  qs = require('qs');

var SERVICE_URL = 'https://api.twitter.com/1.1/favorites/list.json?';

var callFavoritesApi = function callStarApi(params, oauth, cb) {
  params = params || {};

  var defaultParams = {
    count: 200
  };

  params = _.defaults(params, defaultParams);

  var url = SERVICE_URL + qs.stringify(params);
  request.get({url: url, oauth: oauth, json: true}, function(err, req, body) {
    if (err) {
      return cb(err);
    }
    if (body && body.errors) {
      return cb(body.errors);
    }

    cb(null, body);
  });
};

module.exports = function(username, oauth, cb) {

  if (!username) {
    throw new Error('You must provide a username.');
  }

  if (!oauth) {
    throw new Error('You must provide a oauth object.');
  }

  var favorites = [];
  var lastId = null;
  var params = {screen_name: username};

  var starCallback = function(err, res) {
    if (err) {
      return cb(err);
    }

    favorites = favorites.concat(res);

    var lastResult = _.last(res);
    if (!lastResult) {
      return cb(null, []);
    }

    if (lastId === lastResult.id) {
      return cb(null, favorites);
    }

    lastId = lastResult.id;
    params.max_id = lastId;
    callFavoritesApi(params, oauth, starCallback);
  };

  callFavoritesApi(params, oauth, starCallback);
};
