'use strict';

var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../../../Common/AppDispatcher');
var SearchResultsConstants = require('../Constants/SearchPageConstants');

var _results = null;
var _resultError = null;

function _setResults(results) {
  _results = results;
}

function _setResultError(resultError) {
  _resultError = resultError;
}

class SearchResultsStore extends EventEmitter {
  getResults() {
    return _results;
  }

  getResultError() {
    return _resultError;
  }

  emitChange() {
    this.emit('change');
  }

  addChangeListener(callback) {
    this.on('change', callback);
  }

  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }
}

var searchResultsStore = new SearchResultsStore();

AppDispatcher.register(function(payload) {
  switch (payload.eventName) {
    case SearchResultsConstants.SEARCH_FOR_LOCATION:
      _setResults(payload.results);
      _setResultError(payload.resultError);
      break;
  }

  searchResultsStore.emitChange();

  return true;
});

module.exports = searchResultsStore;
