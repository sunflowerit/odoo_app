//app.controller('ContactsCtrl', function( $ionicSlideBoxDelegate, $scope, $http, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {

app.controller('ContactsCtrl', [
  '$scope', '$http', 'jsonRpc','$state','$timeout','ionicMaterialInk','ionicMaterialMotion', '$ionicPopup', '$stateParams',
  '$location','$rootScope','$ionicHistory','$cordovaToast',
  function(
    $scope, $http, jsonRpc, $state, $timeout,ionicMaterialInk, ionicMaterialMotion, $ionicPopup, $stateParams, $location, $rootScope, $ionicHistory, $cordovaToast, data){
      ionicMaterialInk.displayEffect();

      $scope.searchVisible = false;
      $scope.ShowHide = function () {
          $scope.searchVisible = $scope.searchVisible ? false : true;
      }

    $scope.customerid = null;
    $scope.host = "http://o.websandbox.nl";
    //$scope.host = "http://192.168.0.10/";
    $scope.customers = [];
    $scope.contacts = [];
    $scope.suppliers = [];
    $scope.users = [];

    $scope.allcustomers = function (){
      console.log('working');
      jsonRpc.odoo_server = $scope.host;
      $scope.model = 'res.partner';
      $scope.domain = [['customer', '=', true]];
      $scope.fields = ['name', 'phone', 'mobile', 'email', 'image'];

      jsonRpc.searchRead($scope.model, $scope.domain, $scope.fields)
      .then(function(response) {
        console.log("response.records");

        angular.forEach(response.records, function(child){
          //console.log(child.id);
          $scope.customers.push(child);
        });
        console.log($scope.customers);
      }),function(response){
        console.log(response);
      }
    }
    $scope.allcustomers();

      $scope.doRefresh = function() {
            $scope.allcustomers();
               $scope.$broadcast('scroll.refreshComplete');
                  $cordovaToast.showLongCenter('Contacts Refreshed', function(a){},function(b){}, 2000);

      }

    $scope.allusers = function (){
      console.log('working');
      jsonRpc.odoo_server = $scope.host;
      $scope.model = 'res.partner';
      $scope.domain = [['employee', '=', true]];
      $scope.fields = ['name', 'phone', 'mobile', 'email', 'image'];

      jsonRpc.searchRead($scope.model, $scope.domain, $scope.fields)
      .then(function(response) {
        console.log("response.records");

        angular.forEach(response.records, function(child){
          //console.log(child.id);
          $scope.users.push(child);
        });
        console.log($scope.customers);
      }),function(response){
        console.log(response);
      }
    }
    $scope.allusers();

    $scope.allsuppliers = function (){
      console.log('working');
      jsonRpc.odoo_server = $scope.host;
      $scope.model = 'res.partner';
      $scope.domain = [['supplier', '=', true]];
      $scope.fields = ['name', 'phone', 'mobile', 'email', 'image'];

      jsonRpc.searchRead($scope.model, $scope.domain, $scope.fields)
      .then(function(response) {
        console.log("response.records");

        angular.forEach(response.records, function(child){
          //console.log(child.id);
          $scope.suppliers.push(child);
        });
        console.log($scope.customers);
      }),function(response){
        console.log(response);
      }
    }
    $scope.allsuppliers();
    
    $scope.allcontacts = function (){
      console.log('working');
      jsonRpc.odoo_server = $scope.host;
      $scope.model = 'res.partner';
      $scope.domain = [];
      $scope.fields = ['name', 'phone', 'mobile', 'email', 'image'];

      jsonRpc.searchRead($scope.model, $scope.domain, $scope.fields)
      .then(function(response) {
        console.log("response.records");

        angular.forEach(response.records, function(child){
          //console.log(child.id);
          $scope.contacts.push(child);
        });
        console.log($scope.customers);
      }),function(response){
        console.log(response);
      }
    }
    $scope.allcontacts();
    
    $scope.single_contact = function (id){
      $state.go('app.contacts_single', {"ContactId":id});

    }


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