//app.controller('ContactsCtrl', function( $ionicSlideBoxDelegate, $scope, $http, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {

app.controller('RegisterCtrl', [
  '$scope', '$http', 'jsonRpc','$state','$timeout','ionicMaterialInk','ionicMaterialMotion','$stateParams',
  '$location','$rootScope','$ionicHistory',  
  function(
    $scope, $http, jsonRpc, $state, $timeout,ionicMaterialInk, ionicMaterialMotion,$stateParams, $location, $rootScope, $ionicHistory, data){ 
    
    //$scope.host = "http://o.websandbox.nl";
    $scope.host = "http://127.0.0.1";

    console.log($rootScope.uid);

    $scope.store = function(){

      //push
      var push = new Ionic.Push({
        "debug": true
      });
 
      push.register(function(token) {
        console.log("My Device token:",token.token);
        // send token to odoo
        jsonRpc.odoo_server = $scope.host;
        $scope.model = 'mobile.config';
        $scope.domain = [];
        $scope.fields = [('user_id', 'token')];
        $scope.method = 'create';
        $scope.args = [{
          'user_id': $rootScope.uid,
          'token': token.token
        }];
        $scope.kwargs = {};

        console.log('stage1');
        jsonRpc.call($scope.model, $scope.method, $scope.args, $scope.kwargs)
        //.then((response) => {
        .then(function(response) {
          console.log('stage_pass');
          console.log(response);

        //},(response) => {
        },function(response){

          console.log('stage_failed');
          console.log(response);
        });
        // end odoo
        push.saveToken(token);  // persist the token in the Ionic Platform
      });

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