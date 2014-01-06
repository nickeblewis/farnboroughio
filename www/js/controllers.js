angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {
  // Main app controller, empty for the example
})

// A simple controller that fetches a list of data
.controller('ItemsTabCtrl', function($scope, $firebase, Items) {
  // "Items" is a service returning mock data (services.js)
  var ref = new Firebase("https://farnborough.firebaseio.com/places");
  $scope.items = $firebase(ref);
  //$scope.items = Items.all();

  $scope.$on('tab.shown', function() {
    // Might do a load here
  });
  $scope.$on('tab.hidden', function() {
    // Might recycle content here
  });

  $scope.showItem = function() {
    alert("Hello");
  };

  $scope.editTodo = function(todo) {
    $scope.editedTodo = todo;
    console.log(todo);
  }

  $scope.doneEditing = function (todo) {
                $scope.editedTodo = null;
                if (!todo.title) {
                        $scope.removeTodo(todo);
                }
        };

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
});
