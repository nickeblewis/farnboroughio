angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {
  // Main app controller, empty for the example
   $scope.$on('tab.shown', function() {
    // Might do a load here
     console.log("getting gps");
    navigator.geolocation.getCurrentPosition(
        function(position) {
            place.lat = position.coords.latitude;
            place.lng = position.coords.longitude;
        },
        function() {
            alert('Error getting location');
    });
  });
  $scope.$on('tab.hidden', function() {
    console.log("Hidden");
  });
})

// A simple controller that fetches a list of data
.controller('ItemsTabCtrl', function($scope, $firebase, Items, geolocation) {
  // "Items" is a service returning mock data (services.js)
    var URL= "https://farnborough.firebaseio.com"
    // var ref = new Firebase("https://farnborough.firebaseio.com/places");
    
    $scope.items = $firebase(new Firebase(URL + '/places'));
    //$scope.items = Items.all();

  var lat = 0, 
          lng = 0;
    $scope.$on('tab.shown', function() {
      // Might do a load here
       console.log("getting gps");
      navigator.geolocation.getCurrentPosition(
          function(position) {
              lat = position.coords.latitude;
              lng = position.coords.longitude;
          },
          function() {
              alert('Error getting location');
      });
    });
    $scope.$on('tab.hidden', function() {
      console.log("Hidden");
    });


    
    $scope.place = {
      "name": "",
      "description": "",
      "lat": lat,
      "lng": lng
    };

  

  $scope.getCurrentLat = function(geolocation) {
    console.log("getting gps");
    
    

    return lat;
  };

  $scope.initForm =  function(place) {
    console.log("getting gps");
    navigator.geolocation.getCurrentPosition(
        function(position) {
            place.lat = position.coords.latitude;
            place.lng = position.coords.longitude;
        },
        function() {
            alert('Error getting location');
    });
  };

  $scope.createGPS = function(gps) {
     console.log("getting gps");
    navigator.geolocation.getCurrentPosition(
        function(position) {
            place.lat = position.coords.latitude;
            place.lng = position.coords.longitude;
        },
        function() {
            alert('Error getting location');
    });
  };

 

  $scope.showItem = function() {
    alert("Hello");
  };

  $scope.editTodo = function(todo) {
    $scope.editedTodo = todo;
    console.log(todo);
    alert(todo.id);
  }

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
    // Might do a load here
    console.log("getting gps");
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
  angular.extend($scope, {
    farnborough: {
      lat: 51.293,
      lng: -0.75,
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
.controller('ItemCtrl', function($scope, $routeParams, $firebase, Items) {

  //alert($routeParams.itemId);

  var placeRef = new Firebase("https://farnborough.firebaseio.com/places/zaffron");

  placeRef.on('value', function(snapshot) {
    if(snapshot.val() === null) {
      console.log("No exist");
    } else {
      console.log(snapshot.val());
      $scope.item = snapshot.val();
    }
  });

  // "Items" is a service returning mock data (services.js)
  //$scope.item = Items.get($routeParams.itemId);

  
});
