'use strict';

var SearchResultsAction = require('./SearchResultsAction');
var SearchResultsAPINative = require('../API/SearchResultsAPINative');

class SearchResultsActionNative extends SearchResultsAction {
  static searchResultsForLocation(location) {
    SearchResultsAction.searchResultsForLocation(SearchResultsAPINative, location)
  }
}

module.exports = SearchResultsActionNative;
