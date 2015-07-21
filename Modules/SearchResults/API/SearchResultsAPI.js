'use strict';

var jsonp = require('jsonp');

class SearchResultsAPI {
  static findResultsForCurrentLocation(success, failure) {
    var result = {};

    navigator.geolocation.getCurrentPosition(location => {
      result.formatedLocation = location.coords.latitude + ',' + location.coords.longitude;

      SearchPageAPI._executeQuery(SearchPageAPI._formattingQuery('centre_point', result.formatedLocation, 1))
        .then(data => {
          result.listings = data;

          success(result);
        }, error => {
          failure('Error while searching results: ' + JSON.stringify(error));
        });
      }, error => {
        failure('Error while searching results: ' + JSON.stringify(error));
      });
  }

  static findResultsForLocation(location) {
    return SearchPageAPI._executeQuery(SearchPageAPI._formattingQuery('place_name', location, 1))
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
    return new Promise(function(resolve, reject) {
      jsonp(query, function(err, data) {
        if (err)
          reject(err);
        else
          resolve(data);
      });
    }).then(response => new Promise(function(resolve, reject) {
          if (response.response.application_response_code.substr(0, 1) === '1')
            resolve(response.response.listings);
          else
            reject('Location not recognized please try again.');
        }));
  }
}

module.exports = SearchResultsAPI;
