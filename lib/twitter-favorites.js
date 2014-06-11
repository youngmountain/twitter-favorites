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
var _oauth = null;

var TwitterFavorites = function(oauth) {
  if (!oauth) {
    throw new Error('You must provide a oauth object.');
  }
  _oauth = oauth;
};

var getFavoritesFromUser = function callStarApi(params, cb) {
  params = params || {};

  var defaultParams = {
    count: 200
  };

  params = _.defaults(params, defaultParams);

  var url = SERVICE_URL + qs.stringify(params);
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
 * @param {int} sinceId Returns results with an ID greater than (that is, more recent than) the specified ID.
 */
TwitterFavorites.prototype.getFavorites = function getFavorites(user, sinceId) {
  var deferred = Q.defer();

  if (!user) {
    throw new Error('You must provide a user.');
  }

  var favorites = [];
  var params = {screen_name: user};
  if (sinceId) {
    params.since_id = sinceId;
  }

  var starCallback = function(err, res) {
    if (err) {
      return deferred.reject(err);
    }

    favorites = favorites.concat(res);

    if (sinceId) {
      var index = _.findIndex(favorites, {id: sinceId});
      if (index > -1) {
        return deferred.resolve(favorites.slice(0, index));
      }
    }

    if (res.length === 0 || res.length < 100) {
      return deferred.resolve(favorites);
    }

    params.max_id = _.last(res).id;
    getFavoritesFromUser(params, starCallback);
  };

  getFavoritesFromUser(params, starCallback);

  return deferred.promise;
};

module.exports = TwitterFavorites;
