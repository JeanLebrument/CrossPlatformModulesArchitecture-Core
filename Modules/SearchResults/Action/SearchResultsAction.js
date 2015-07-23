'use strict';

var AppDispatcher = require('../../../../Core/Common/AppDispatcher');
var SearchResultsConstants = require('../Constants/SearchResultsConstants');
var SearchResultsAPI = require('../../../../Core/Modules/SearchResults/API/SearchResultsAPI');
var SearchResultsStore = require('../../../../Core/Modules/SearchResults/Store/SearchResultsStore');

class SearchResultsAction {
  static _dispatchResult(results, error) {
    AppDispatcher.dispatch({
      eventName: SearchResultsConstants.SEARCH_FOR_LOCATION,
      results: results,
      resultError: error
    });
  }

  static searchResultsForCurrentLocation(httpClientClass) {
    httpClientClass.findResultsForCurrentLocation()
      .then(results => { SearchResultsAction._dispatchResult(results, null); },
            error => { SearchResultsAction._dispatchResult(null, error); }
      );
  }

  static searchResultsForLocation(httpClientClass, location) {
    httpClientClass.findResultsForLocation(location)
      .then(result => { SearchResultsAction._dispatchResult(result, null); },
            error => { SearchResultsAction._dispatchResult(null, error); }
      );
  }
}

module.exports = SearchResultsAction;
