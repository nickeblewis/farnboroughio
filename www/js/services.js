angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Items', function() {
  // Might use a resource here that returns a JSON array

  // Some fake/mock/almost real testing data
  var items = [
    { id: 0, title: 'St Michaels Abbey', description: 'Description', lat: 51.29692, lng: -0.7608 },
    { id: 1, title: 'St Peters Church', description: 'Description', lat: 51.29692, lng: -0.7608},
    { id: 2, title: 'St Marks Church', description: 'Description', lat: 51.29692, lng: -0.7608 },
    { id: 3, title: 'Rushmoor Borough Council Offices', description: 'Description', lat: 51.29692, lng: -0.7608 },
    { id: 3, title: 'Test', description: 'Description' },
    { id: 3, title: 'Test', description: 'Description' },
    { id: 3, title: 'Test', description: 'Description' }
    
  ];

  return {
    all: function() {
      return items;
    },
    get: function(itemId) {
      // Simple index lookup
      return items[itemId];
    }
  }
});
