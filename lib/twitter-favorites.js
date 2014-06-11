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
  qs = require('qs'),
  Q = require('q');

var SERVICE_URL = 'https://api.twitter.com/1.1/favorites/list.json?';

var TwitterFavorites = function(oauth) {
  if (!oauth) {
    throw new Error('You must provide a oauth object.');
  }

  this.oauth = oauth;
};

var getFavoritesFromUser = function callStarApi(params, cb) {
  params = params || {};

  var defaultParams = {
    count: 200
  };

  params = _.defaults(params, defaultParams);

  var url = SERVICE_URL + qs.stringify(params);
  request.get({url: url, oauth: TwitterFavorites.oauth, json: true}, function(err, req, body) {
    if (err) {
      return cb(err);
    }
    if (body && body.errors) {
      return cb(body.errors);
    }

    cb(null, body);
  });
};

/**
 * List repositories being starred by a user.
 *
 * @param {string} user The usernam of the user for whom to return results for.
 */
TwitterFavorites.prototype.getFavorites = function getFavorites(user) {
  var deferred = Q.defer();

  if (!user) {
    throw new Error('You must provide a user.');
  }

  var favorites = [];
  var lastId = null;
  var params = {screen_name: user};

  var starCallback = function(err, res) {
    if (err) {
      return deferred.reject(err);
    }

    favorites = favorites.concat(res);

    var lastResult = _.last(res);
    if (!lastResult) {
      return deferred.resolve(favorites);
    }

    if (lastId === lastResult.id) {
      return deferred.resolve(favorites);
    }

    lastId = lastResult.id;
    params.max_id = lastId;
    getFavoritesFromUser(params, starCallback);
  };

  getFavoritesFromUser(params, starCallback);

  return deferred.promise;
};

module.exports = TwitterFavorites;
