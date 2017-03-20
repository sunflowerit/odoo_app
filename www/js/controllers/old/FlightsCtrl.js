//app.controller('ContactsCtrl', function( $ionicSlideBoxDelegate, $scope, $http, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {

app.controller('FlightsCtrl', [
  '$scope', '$http', 'jsonRpc','$state','$timeout','ionicMaterialInk','ionicMaterialMotion','$stateParams',
  '$location','$rootScope','$ionicHistory',  
  function(
    $scope, $http, jsonRpc, $state, $timeout,ionicMaterialInk, ionicMaterialMotion,$stateParams, $location, $rootScope, $ionicHistory, data){ 
    
    $scope.host = "http://o.websandbox.nl";
    $scope.flights = [];
    $scope.allcustomers = function (){
      console.log('working');
      jsonRpc.odoo_server = $scope.host;
      $scope.model = 'flight.reservation';
      $scope.domain = [];
      $scope.fields = ['partner_id', 'name', 'route', 'mobile', 'email'];

      jsonRpc.searchRead($scope.model, $scope.domain, $scope.fields)
      .then(function(response) {
        console.log(response.records);

        angular.forEach(response.records, function(child){
          //console.log(child.id);
          $scope.flights.push(child);
        });
        console.log($scope.flights);
      }),function(response){
        console.log(response);
      }
    }
    $scope.allcustomers();
    
    $scope.single_contact = function (id){
      $state.go('app.contacts/' +id);
    }

   $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
}])
;