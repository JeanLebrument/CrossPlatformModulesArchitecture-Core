'use strict';

var SearchResultsAction = require('./SearchResultsAction');
var SearchResultsAPIWeb = require('../API/SearchResultsAPIWeb');

class SearchResultsActionWeb extends SearchResultsAction {
  static searchResultsForLocation(location) {
    SearchResultsAction.searchResultsForLocation(SearchResultsAPIWeb, location)
  }
}

module.exports = SearchResultsActionWeb;
