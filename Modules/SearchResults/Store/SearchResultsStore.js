'use strict';

var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../../../Common/AppDispatcher');
var SearchResultsConstants = require('../Constants/SearchResultsConstants');

class SearchResultsStore extends EventEmitter {
  constructor() {
    super();
    
    this.results = null;
    this.resultError = null;
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
      searchResultsStore.results = payload.results;
      searchResultsStore.resultError = payload.resultError;
      break;
  }

  searchResultsStore.emitChange();

  return true;
});

module.exports = searchResultsStore;
