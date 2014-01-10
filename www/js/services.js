angular.module('starter.services', [])
.factory('geolocation', function ($rootScope) {
  return {
    getCurrentPosition: function (onSuccess, onError, options) {
      navigator.geolocation.getCurrentPosition(function () {
        var that = this,
          args = arguments;

        if (onSuccess) {
          $rootScope.$apply(function () {
            onSuccess.apply(that, args);
          });
        }
      }, function () {
        var that = this,
          args = arguments;

        if (onError) {
          $rootScope.$apply(function () {
            onError.apply(that, args);
          });
        }
      },
      options);
    }
  };
})
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
