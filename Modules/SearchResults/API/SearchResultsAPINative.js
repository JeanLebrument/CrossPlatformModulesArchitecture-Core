'use strict';

var SearchResultsAPI = require('./SearchResultsAPI');

class SearchResultsAPINative extends SearchResultsAPI {
  static _executeQuery(query) {
    console.log('query: ' + query);
    return fetch(query)
      .then(response => response.json())
      .then(response => new Promise(function(resolve, reject) {
        if (response.response.application_response_code.substr(0, 1) === '1')
          resolve(response.response.listings);
        else
          reject('Location not recognized please try again.');
      }));
  }
}

module.exports = SearchResultsAPINative;
