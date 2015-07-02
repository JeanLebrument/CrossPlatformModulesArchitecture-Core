'use strict';

var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../../../Common/AppDispatcher');
var SearchPageConstants = require('../Constants/SearchPageConstants');

var _results = null;
var _resultError = null;

function _setResults(results) {
  _results = results;
}

function _setResultError(resultError) {
  _resultError = resultError;
}

class SearchPageStore extends EventEmitter {
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

var searchPageStore = new SearchPageStore();

AppDispatcher.register(function(payload) {
  switch (payload.eventName) {
    case SearchPageConstants.SEARCH_FOR_LOCATION:
      _setResults(payload.results);
      _setResultError(payload.resultError);
      break;
  }

  searchPageStore.emitChange();

  return true;
});

module.exports = searchPageStore;
