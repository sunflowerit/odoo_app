//app.controller('ContactsCtrl', function( $ionicSlideBoxDelegate, $scope, $http, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {

app.controller('InventoryControlCtrl', [
    '$scope', '$http', 'jsonRpc','$state','$timeout','ionicMaterialInk','ionicMaterialMotion', '$ionicPopup', '$stateParams',
    '$location','$rootScope','$ionicHistory',
    function(
        $scope, $http, jsonRpc, $state, $timeout,ionicMaterialInk, ionicMaterialMotion, $ionicPopup, $stateParams, $location, $rootScope, $ionicHistory, data){
        ionicMaterialInk.displayEffect();

        $scope.host = "http://o.websandbox.nl";
        $scope.inventory = [];
        $scope.adjustments = [];


        $scope.allinventory = function (){
            jsonRpc.odoo_server = $scope.host;
            $scope.model = 'stock.history';
            $scope.domain = [];
            $scope.fields = ['product_id','date','quantity', 'inventory_value'];

            jsonRpc.searchRead($scope.model, $scope.domain, $scope.fields)
                .then(function(response) {
                    console.log(response.records);

                    angular.forEach(response.records, function(child){
                        //console.log(child.id);
                        $scope.inventory.push(child);
                    });
                    console.log($scope.customers);
                }),function(response){
                console.log(response);
            }
        }
        $scope.allinventory();

        $scope.alladjustments = function (){
            console.log('working');
            jsonRpc.odoo_server = $scope.host;
            $scope.model = 'stock.inventory';
            $scope.domain = [];
            $scope.fields = ['name','date','state'];

            jsonRpc.searchRead($scope.model, $scope.domain, $scope.fields)
                .then(function(response) {
                    console.log("response.records");

                    angular.forEach(response.records, function(child){
                        //console.log(child.id);
                        $scope.adjustments.push(child);
                    });
                    console.log($scope.customers);
                }),function(response){
                console.log(response);
            }
        }
        $scope.alladjustments();


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