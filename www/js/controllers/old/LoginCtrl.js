//app.controller('LoginCtrl', [ 'jsonRpc', function(jsonRpc, $scope, $timeout, $stateParams, ionicMaterialInk, ionicMaterialMotion, $location, $ionicHistory, $http, $state, $auth, $rootScope) {
app.controller('LoginCtrl', [
  '$scope', '$http', 'jsonRpc','$state','$timeout','ionicMaterialInk','ionicMaterialMotion','$stateParams',
  '$location','$rootScope','$ionicHistory',  
  function(
    $scope, $http, jsonRpc, $state, $timeout,ionicMaterialInk, ionicMaterialMotion,$stateParams, $location, $rootScope, $ionicHistory, data){ 

    
    $scope.host = "http://o.websandbox.nl";
    //$scope.host = "http://127.0.0.1";
    $scope.database = 'easl';
    $scope.username = 'admin';
    $scope.password = 'admin'
        

// on click of connect button, connect to server
    $scope.connect = function() {
      console.log('me');
      jsonRpc.odoo_server = $scope.host;

      jsonRpc.login($scope.database, $scope.username, $scope.password)
      //.then((response) => {
      .then(function(response) {
        console.log(response.uid);
        $rootScope.uid = response.uid;
        console.log('res');
        $scope.model = 'res.partner';
        $scope.domain = [];
        $scope.fields = ['name', 'phone', 'mobile'];

        jsonRpc.searchRead($scope.model, $scope.domain, $scope.fields)
          //.then((response) => {
          .then(function(response) {
            console.log(response.records);
           //},(response) => {
          },function(response){
            console.log(response);
          });
          
        //window.location = '#/app/contacts';
        //$location.path('/contacts');
        $state.go('app.contacts');
        //$state.go('contacts');
      },function(response){
        
        console.log(response);
        if (hasOwnProperty(response.fullTrace.data, 'debug')) {
          console.log('error occured');
       }
      });

    }

    $scope.logout = function(){

        $http.get('http://localhost/quickpay/logout').success(function(data, status, headers, config) {
            console.log('Successfully logged out'); 

        }).error(function(data, status) { 
            console.log('failed logged out'); 

        });
    }

     $scope.$parent.clearFabs();
    
    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 1);

    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
}])
;