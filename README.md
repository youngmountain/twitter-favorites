# twitter-favorites
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image] [![Coverage Status][coveralls-image]][coveralls-url]

retrieve twitter favorites


## Install

```bash
$ npm install --save twitter-favorites
```


## Usage

```javascript
var twitterFavorites = require('twitter-favorites');

var oauth = {
  consumer_key: 'CONSUMER_KEY',
  consumer_secret: 'CONSUMER_SECRET',
  token: 'TOKEN',
  token_secret: 'TOKEN_SECRET'
};

twitterFavorites('kwakayama', oauth, function(err, result) {
  if(err) {
    console.log(err);
    return;
  }
  console.log(result);
});
```

## API

_(Coming soon)_


## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [gulp](http://gulpjs.com/).


## Release History

_(Nothing yet)_


## License

Copyright (c) 2014 Kentaro Wakayama. Licensed under the MIT license.



[npm-url]: https://npmjs.org/package/twitter-favorites
[npm-image]: https://badge.fury.io/js/twitter-favorites.svg
[travis-url]: https://travis-ci.org/youngmountain/twitter-favorites
[travis-image]: https://travis-ci.org/youngmountain/twitter-favorites.svg?branch=master
[daviddm-url]: https://david-dm.org/youngmountain/twitter-favorites.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/youngmountain/twitter-favorites
[coveralls-url]: https://coveralls.io/r/youngmountain/twitter-favorites
[coveralls-image]: https://coveralls.io/repos/youngmountain/twitter-favorites/badge.png
