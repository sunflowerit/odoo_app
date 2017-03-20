app.controller('FlightsCtrl', function ($scope, $stateParams, ionicMaterialInk) {
    //ionic.material.ink.displayEffect();
    ionicMaterialInk.displayEffect();
    $scope.aircraft = [];
    $scope.calendar = [];
    $scope.products = [];
    $scope.reservations = [];
    // Toggle Code Wrapper
    var code = document.getElementsByClassName('code-wrapper');
    for (var i = 0; i < code.length; i++) {
        code[i].addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }
});

//app.controller('ContactsCtrl', function( $ionicSlideBoxDelegate, $scope, $http, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {

app.controller('FlightsCtrl', [
    '$scope', '$http', 'jsonRpc','$state','$timeout','ionicMaterialInk','ionicMaterialMotion', '$ionicPopup', '$stateParams',
    '$location','$rootScope','$ionicHistory',
    function(
        $scope, $http, jsonRpc, $state, $timeout,ionicMaterialInk, ionicMaterialMotion, $ionicPopup, $stateParams, $location, $rootScope, $ionicHistory, data){
        ionicMaterialInk.displayEffect();

        $scope.host = "http://o.websandbox.nl";
        $scope.reservations = [];
        $scope.allcustomers = function (){
            console.log('working');
            jsonRpc.odoo_server = $scope.host;
            $scope.model = 'flight.reservation';
            $scope.domain = [];
            $scope.fields = ['date_planned', 'duration', 'aircraft_id', 'partner_id', 'route', 'state'];

            jsonRpc.searchRead($scope.model, $scope.domain, $scope.fields)
                .then(function(response) {
                    console.log("response.records");

                    angular.forEach(response.records, function(child){
                        //console.log(child.id);
                        $scope.reservations.push(child);
                    });
                    console.log($scope.reservations);
                }),function(response){
                console.log(response);
            }
        }
        $scope.allcustomers();

        $scope.single_contact = function (id){
            $state.go('app.contacts/' +id);
        }

        var code = document.getElementsByClassName('code-wrapper');
        for (var i = 0; i < code.length; i++) {
            code[i].addEventListener('click', function() {
                this.classList.toggle('active');
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
    }]);
