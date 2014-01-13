angular.module('starter.controllers', [])
.controller('AppCtrl', function($scope) {
  // Currently not in use
})

// The Main List Controller
// "Items" is a service returning mock data (services.js)
// TODO - geolocation - is it needed still in the params below???
.controller('ItemsTabCtrl', function($scope, $firebase, Items, geolocation, Modal) {
   
  var placesURL= "https://farnborough.firebaseio.com"
      
  $scope.items = $firebase(new Firebase(placesURL + '/places'));
  // or we can retrieve data from the mock service if we need to - $scope.places = Items.all();

  $scope.items.$on('loaded', function() {
    console.log($scope.items);
  });

  

  $scope.itemSelected = function(name) {
    console.log(name);
  };

  $scope.onRefresh = function() {
    $scope.items.$update();
  };
  $scope.showPlace = function(item) {
    $scope.taskModal.scope.item = item;
    $scope.taskModal.show();
  };

  // Close the new task modal
  $scope.closePlace = function() {
    $scope.taskModal.hide();
  };

  // $scope.editTodo = function(todo) {
  //   $scope.editedTodo = todo;
  //   console.log(todo);
  //   alert(todo.id);
  // }

  $scope.saveAll = function() {
    $scope.items.$save();
  };
})

.controller('NewPlaceCtrl', function($scope, $routeParams, $firebase, Items) {

  var URL= "https://farnborough.firebaseio.com"
  // var ref = new Firebase("https://farnborough.firebaseio.com/places");

  $scope.items = $firebase(new Firebase(URL + '/places'));
  //$scope.items = Items.all();

  var lat = 0, 
      lng = 0;

  $scope.place = {
    "name": "",
    "description": "",
    "lat": lat,
    "lng": lng
  };

  $scope.$on('tab.shown', function() {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        $scope.place.lat = position.coords.latitude;
        $scope.place.lng = position.coords.longitude;
      },
      function() {
        alert('Error getting location');
      });
  });

  $scope.$on('tab.hidden', function() {
    console.log("Hidden");
  });

  $scope.createPlace = function(place) {
    $scope.items.$add({
      name: place.name,
      description: place.description,
      lat: place.lat,
      lng: place.lng
    });
  };
})

.controller('MapCtrl', function($scope, $routeParams, $firebase, Items) { 

  var lat = 51.293, lng = -0.75;

  $scope.$on('tab.shown', function() {
    // Might do a load here
     
    navigator.geolocation.getCurrentPosition(
      function(position) {
        $scope.farnborough.lat = position.coords.latitude;
        $scope.farnborough.lng = position.coords.longitude;
      },
      function() {
        alert('Error getting location');
    });
  });

  angular.extend($scope, {
    farnborough: {
      lat: lat,
      lng: lng,
      zoom: 16
    },
    markers: {
      main_marker: {
        lat: 51.293,
        lng: -0.75,
        focus: true,
        draggable: true,
        label: {
          message: "Hey, drag me if you want",
          options: {
            noHide: true
          }
        }      
      }
    },
    defaults: {
      maxZoom: 18,
      minZoom: 1,
      zoom: 6,
      zoomControlPosition: 'topright',
      tileLayerOptions: {
        opacity: 0.9,
        detectRetina: true,
        reuseTiles: true,
      },
      scrollWheelZoom: false
    }
  });
})

// A simple controller that shows a tapped item's data
.controller('ItemCtrl', function($scope, $stateParams, $firebase, Items) {

  

  $scope.place = {};

  var dataRef = new Firebase('https://farnborough.firebaseio.com/places/' + $stateParams.itemId);
    dataRef.on('value', function(snapshot) {
      console.log(snapshot.val());
      $scope.place.name = snapshot.val().name;
      $scope.place.description = snapshot.val().description;
      $scope.place.lat = snapshot.val().lat;
      $scope.place.lng = snapshot.val().lng;
  });

 

  angular.extend($scope, {
    center: {
      lat: $scope.place.lat,
      lng: $scope.place.lng,
      zoom: 16
    },
    markers: {
      main_marker: {
        lat: $scope.place.lat,
        lng: $scope.place.lng,
        focus: true,
        draggable: true,
        message: "Fred"
             
      }
    },
    defaults: {
      maxZoom: 18,
      minZoom: 1,
      zoom: 6,
      zoomControlPosition: 'topright',
      tileLayerOptions: {
        opacity: 0.9,
        detectRetina: true,
        reuseTiles: true,
      },
      scrollWheelZoom: false
    }
  });
});
