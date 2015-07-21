'use strict';

var AppDispatcher = require('../../../../Core/Common/AppDispatcher');
var SearchResultsConstants = require('../Constants/SearchPageConstants');
var SearchResultsAPI = require('../../../../Core/Modules/SearchPage/API/SearchPageAPI');
var SearchResultsStore = require('../../../../Core/Modules/SearchPage/Store/SearchPageStore');

class SearchResultsAction {
  static _dispatchResult(results, error) {
    AppDispatcher.dispatch({
      eventName: SearchResultsConstants.SEARCH_FOR_LOCATION,
      results: results,
      resultError: error
    });
  }

  static searchResultsForCurrentLocation() {
    SearchResultsAPI.findResultsForCurrentLocation(
      results => { SearchPageAction._dispatchResult(results, null); },
      error => { SearchPageAction._dispatchResult(null, error); }
    );
  }

  static searchResultsForLocation(location) {
    SearchResultsAPI.findResultsForLocation(location)
      .then(result => { SearchPageAction._dispatchResult(result, null); },
            error => { SearchPageAction._dispatchResult(null, error); }
        );
  }
}

module.exports = SearchResultsAction;
