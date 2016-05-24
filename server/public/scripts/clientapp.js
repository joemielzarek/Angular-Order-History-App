var myApp = angular.module('myApp', []);

myApp.controller('IndexController', ['$scope', '$http', function($scope, $http) {

  $scope.currentCustomer = function(person) {
    $scope.showCustomer = person;
  };

  $scope.getCustomers = function() {
  $http({
    method: 'GET',
    url: '/customers'
  }).then(function(response) {
    data = response.data;
    console.log(data);
    //console.log(response);
    $scope.people = response.data;
     });
  };

  $scope.getOrders = function() {
  $http({
    method: 'GET',
    url: '/orders'
  }).then(function(response) {
    data = response.data;
    console.log(data);
    //console.log(response);

    response.data.forEach(function(lineItem) {
      if ($scope.orders[lineItem.id]) {
        $scope.orders[lineItem.id].lineItem.push({quantity: lineItem.quantity,
            unit_price: lineItem.unit_price,
            description: lineItem.description })
      } else {
        $scope.orders[lineItem.id] = {
          customer_id: lineItem.customer_id,
          order_date: lineItem.order_date,
          street: lineItem.street,
          city: lineItem.city,
          state: lineItem.state,
          zip: lineItem.zip,
          lineItem: [{ unit_price: lineItem.unit_price,
                       quantity: lineItem.quantity,
                       description: lineItem.description
                     }]
        }
      }
    });
    console.log($scope.orders);
  });
  };

    console.log('angular rocks!');

    $scope.count = 0;

    $scope.getCustomers();
    $scope.getOrders();


    $scope.increment = function() {
        $scope.count++;
    };

    $scope.addPerson = function() {
      $scope.people.push(
          {
              name: 'Scott',
              position: 'Director of something',
              location: 'Bloomington'
          }
      );
    }

}]);
