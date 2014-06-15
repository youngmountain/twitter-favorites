/*
 * twitter-favorites
 * https://github.com/kwakayama/twitter-favorites
 *
 * Copyright (c) 2014 Kentaro Wakayama
 * Licensed under the MIT license.
 */

'use strict';

var assert = require('assert'),
  request = require('request'),
  _ = require('lodash'),
  qs = require('qs'),
  Q = require('q');

var SERVICE_URL = 'https://api.twitter.com/1.1/favorites/list.json?';
var COUNT = 200;
var _oauth = null;

var TwitterFavorites = function(oauth) {
  assert.ok(oauth, 'You must provide a oauth object.');
  _oauth = oauth;
};

var getFavoritesFromUser = function callStarApi(params, cb) {
  params = params || {};

  var defaultParams = {
    count: COUNT
  };

  params = _.defaults(params, defaultParams);

  var url = SERVICE_URL + qs.stringify(params);
  console.log(url);
  request.get({url: url, oauth: _oauth, json: true}, function(err, req, body) {
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
 * List favorited tweets by a user.
 *
 * @param {string} user The usernam of the user for whom to return results for.
 */
TwitterFavorites.prototype.getFavorites = function getFavorites(user) {
  var deferred = Q.defer();

  if (!user) {
    throw new Error('You must provide a user.');
  }

  var favorites = [];
  var params = {screen_name: user};

  var starCallback = function(err, res) {
    if (err) {
      return deferred.reject(err);
    }

    favorites = favorites.concat(res);

    if (res.length === 0 || res.length < COUNT) {
      return deferred.resolve(favorites);
    }

    params.max_id = _.last(res).id;
    getFavoritesFromUser(params, starCallback);
  };

  getFavoritesFromUser(params, starCallback);

  return deferred.promise;
};

module.exports = TwitterFavorites;
