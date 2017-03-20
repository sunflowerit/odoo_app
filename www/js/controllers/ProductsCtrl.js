//app.controller('ContactsCtrl', function( $ionicSlideBoxDelegate, $scope, $http, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {

app.controller('ProductsCtrl', [
  '$scope', '$http', 'jsonRpc','$state','$timeout','ionicMaterialInk','ionicMaterialMotion', '$ionicPopup', '$stateParams',
  '$location','$rootScope','$ionicHistory',
  function(
    $scope, $http, jsonRpc, $state, $timeout,ionicMaterialInk, ionicMaterialMotion, $ionicPopup, $stateParams, $location, $rootScope, $ionicHistory, data){
    ionicMaterialInk.displayEffect();
      
    $scope.host = "http://o.websandbox.nl";
    $scope.products = [];
    $scope.products_service = [];
    $scope.products_consumable = [];
    $scope.products_stockable = [];

    $scope.allproducts = function (){
      console.log('working');
      jsonRpc.odoo_server = $scope.host;
      $scope.model = 'product.template';
      $scope.domain = [];
      $scope.fields = ['name','type', 'list_price', 'qty_available'];

      jsonRpc.searchRead($scope.model, $scope.domain, $scope.fields)
      .then(function(response) {
        console.log(response.records);

        angular.forEach(response.records, function(child){
          //console.log(child.id);
          $scope.products.push(child);
        });
      }),function(response){
        console.log(response);
      }
    }
    $scope.allproducts();
      $scope.single_product = function (id){
          $state.go('app.products_single', {"ProductId":id});

      }

    $scope.allproducts_service = function (){
      console.log('working');
      jsonRpc.odoo_server = $scope.host;
      $scope.model = 'product.template';
      $scope.domain = [['type', '=', 'service']];
      $scope.fields = ['name'];

      jsonRpc.searchRead($scope.model, $scope.domain, $scope.fields)
      .then(function(response) {
        console.log("response.records");

        angular.forEach(response.records, function(child){
          //console.log(child.id);
          $scope.products_service.push(child);
        });
      }),function(response){
        console.log(response);
      }
    }
    $scope.allproducts_service();

    $scope.allproducts_consumable = function (){
      console.log('working');
      jsonRpc.odoo_server = $scope.host;
      $scope.model = 'product.template';
      $scope.domain = [['type', '=', 'consu']];
      $scope.fields = ['name'];

      jsonRpc.searchRead($scope.model, $scope.domain, $scope.fields)
      .then(function(response) {
        console.log("response.records");

        angular.forEach(response.records, function(child){
          //console.log(child.id);
          $scope.products_consumable.push(child);
        });
      }),function(response){
        console.log(response);
      }
    }
    $scope.allproducts_consumable();
    
    $scope.allproducts_stockable = function (){
      console.log('working');
      jsonRpc.odoo_server = $scope.host;
      $scope.model = 'product.template';
      $scope.domain = [['type', '=', 'product']];
      $scope.fields = ['name'];

      jsonRpc.searchRead($scope.model, $scope.domain, $scope.fields)
      .then(function(response) {
        console.log("response.records");

        angular.forEach(response.records, function(child){
          //console.log(child.id);
          $scope.products_stockable.push(child);
        });
      }),function(response){
        console.log(response);
      }
    }
    $scope.allproducts_stockable();




      $scope.add= function () {
          $scope.form = true;
          var alertPopup = $ionicPopup.show({
              scope: $scope,
              title: 'Add new contact',
              templateUrl: 'templates/add_contact.html'
          });
          $scope.addContact = function() {
              console.log("closed");
              alertPopup.close();
              $state.go('app.contacts');
          };
      }

      $scope.single_contact_back = function (){
          $scope.customerid = null;
      }
      $scope.singelcustomers = [];
      $scope.single_contact2 = function (id){
          $scope.customerid = id;
          jsonRpc.odoo_server = $scope.host;
          $scope.model = 'res.partner';
          $scope.domain = [['id','=', id]];
          $scope.fields = ['name', 'phone', 'mobile', 'email', 'image'];

          jsonRpc.searchRead($scope.model, $scope.domain, $scope.fields)
              .then(function(response) {
                  console.log("response.records");

                  angular.forEach(response.records, function(child){
                      //console.log(child.id);
                      $scope.singelcustomers.push(child);
                  });
                  console.log($scope.singelcustomers);
              }),function(response){
              console.log(response);
          }
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