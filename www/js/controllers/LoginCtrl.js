//app.controller('LoginCtrl', [ 'jsonRpc', function(jsonRpc, $scope, $timeout, $stateParams, ionicMaterialInk, ionicMaterialMotion, $location, $ionicHistory, $http, $state, $auth, $rootScope) {
app.controller('LoginCtrl', [
  '$scope', '$http', 'jsonRpc','$state','$timeout','ionicMaterialInk','ionicMaterialMotion','$stateParams',
  '$location','$rootScope','$ionicHistory', '$ionicPopup', '$ionicLoading',
  function(
    $scope, $http, jsonRpc, $state, $timeout,ionicMaterialInk, ionicMaterialMotion,$stateParams, $location, $rootScope, $ionicHistory, $ionicPopup, $ionicLoading, data){

    
    //$scope.host = "http://o.websandbox.nl";
    //$scope.host = "http://192.168.0.10";
      $scope.host = "http://o.websandbox.nl";
      $scope.database = 'daimond_lighting';
      $scope.username = 'admin';
      $scope.password = 'admin';

// on click of connect button, connect to server
    $scope.connect = function(username, password) {
        $scope.host = "http://o.websandbox.nl";
        $scope.database = 'daimond_lighting';
        $scope.username = 'admin';
        $scope.password = 'admin';
      console.log(username);
        console.log(password);
      jsonRpc.odoo_server = $scope.host;

      jsonRpc.login($scope.database, username, password)
      //.then((response) => {


      .then(function(response) {
        console.log(response.uid);
        $rootScope.uid = response.uid;
        console.log($rootScope.uid);
        $scope.model = 'res.partner';
        $scope.domain = [];
        $scope.fields = ['name', 'phone', 'mobile'];


        jsonRpc.searchRead($scope.model, $scope.domain, $scope.fields)
          //.then((response) => {


          .then(function(response) {
              $ionicLoading.show({
                  template: '<ion-spinner icon="ios"></ion-spinner>',
                  animation: 'fade-in',
                  showBackdrop: true,
                  maxWidth: 400,
                  showDelay: 0
              }).then(function () {
                  console.log("The loading indicator is now displayed");
              })
            console.log(response.records);
           //},(response) => {
          },function(response){

            console.log(response);
          });
          
        //window.location = '#/app/contacts';
        //$location.path('/contacts');
          $ionicHistory.nextViewOptions({
              disableBack: true
          });

          $timeout(function () {
              $ionicLoading.hide();
              $state.go('app.messages');
          }, 1000);


      },function(response){
         
        console.log(response);
        if (hasOwnProperty(response.fullTrace.data, 'debug')) {
          console.log('error occured');
       }
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
}])
;