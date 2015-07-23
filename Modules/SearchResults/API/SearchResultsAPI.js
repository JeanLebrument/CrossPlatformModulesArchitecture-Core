'use strict';

var jsonp = require('jsonp');

class SearchResultsAPI {
  static findResultsForCurrentLocation() {
    var result = {};

    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(location => {
        result.formatedLocation = location.coords.latitude + ',' + location.coords.longitude;

        this._executeQuery(SearchResultsAPI._formattingQuery('centre_point', result.formatedLocation, 1))
          .then(data => {
            result.listings = data;

            resolve(result);
          }, error => {
            reject(Error('Error while searching results: ' + JSON.stringify(error)));
          });
        }, error => {
          reject(Error('Error while searching results: ' + JSON.stringify(error)));
        });
    });
  }

  static findResultsForLocation(location) {
    return this._executeQuery(this._formattingQuery('place_name', location, 1))
      .then(data => {
        return new Promise(function(resolve, reject) { resolve({ location: location, listings: data }); });
      }, error => {
        return new Promise(function(resolve, reject) { reject('Error while searching results: ' + JSON.stringify(error)); });
      });
  }

  static _formattingQuery(key, value, pageNumber) {
    var data = {
        country: 'uk',
        pretty: '1',
        encoding: 'json',
        listing_type: 'buy',
        action: 'search_listings',
        page: pageNumber
    };

    data[key] = value;

    var querystring = Object.keys(data)
      .map(key => key + '=' + encodeURIComponent(data[key]))
      .join('&');

    return 'http://api.nestoria.co.uk/api?' + querystring;
  };

  static _executeQuery(query) {
    throw new TypeError("SearchResultsAPI - _executeQuery is an abstract method");
  }
}

module.exports = SearchResultsAPI;
