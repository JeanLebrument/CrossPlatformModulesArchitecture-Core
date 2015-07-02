'use strict';

var AppDispatcher = require('../../../../Core/Common/AppDispatcher');
var SearchPageConstants = require('../Constants/SearchPageConstants');
var SearchPageAPI = require('../../../../Core/Modules/SearchPage/API/SearchPageAPI');
var SearchPageStore = require('../../../../Core/Modules/SearchPage/Store/SearchPageStore');

class SearchPageAction {
  static _dispatchResult(results, error) {
    AppDispatcher.dispatch({
      eventName: SearchPageConstants.SEARCH_FOR_LOCATION,
      results: results,
      resultError: error
    });
  }

  static searchResultsForCurrentLocation() {
    SearchPageAPI.findResultsForCurrentLocation(
      results => { SearchPageAction._dispatchResult(results, null); },
      error => { SearchPageAction._dispatchResult(null, error); }
    );
  }

  static searchResultsForLocation(location) {
    SearchPageAPI.findResultsForLocation(location)
      .then(result => { SearchPageAction._dispatchResult(result, null); },
            error => { SearchPageAction._dispatchResult(null, error); }
        );
  }
}

module.exports = SearchPageAction;
