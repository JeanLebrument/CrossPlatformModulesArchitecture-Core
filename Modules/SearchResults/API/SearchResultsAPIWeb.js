'use strict';

var SearchResultsAPI = require('./SearchResultsAPI');

class SearchResultsAPIWeb extends SearchResultsAPI {
  static _executeQuery(query) {
    return new Promise(function(resolve, reject) {
      console.log('_executeQuery - inside promise: ' + query);
      console.log('jsonp: ' + jsonp);
      jsonp(query, function(err, data) {
        console.log('jsonp callback - err: ' + JSON.stringify(err) + ' data: ' + JSON.stringify(data));
        if (err)
          reject(err);
        else
          resolve(data);
      });
    }).then(response => new Promise(function(resolve, reject) {
        console.log('_executeQuery - inside last promise');
        if (response.response.application_response_code.substr(0, 1) === '1')
          resolve(response.response.listings);
        else
          reject('Location not recognized please try again.');
      }));
  }
}

module.exports = SearchResultsAPIWeb;
