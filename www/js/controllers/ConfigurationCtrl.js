//app.controller('ContactsCtrl', function( $ionicSlideBoxDelegate, $scope, $http, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {

app.controller('ConfigurationCtrl', [
    '$scope', '$http', 'jsonRpc','$state','$timeout','ionicMaterialInk','ionicMaterialMotion', '$ionicPopup', '$stateParams',
    '$location','$rootScope','$ionicHistory',
    function(
        $scope, $http, jsonRpc, $state, $timeout,ionicMaterialInk, ionicMaterialMotion, $ionicPopup, $stateParams, $location, $rootScope, $ionicHistory, data){
        ionicMaterialInk.displayEffect();

        $scope.host = "http://o.websandbox.nl";
        $scope.warehouses = [];
        $scope.routes = [];
        $scope.locations = [];
        $scope.uoms = [];


        $scope.allwarehouses = function (){
            jsonRpc.odoo_server = $scope.host;
            $scope.model = 'stock.warehouse';
            $scope.domain = [];
            $scope.fields = ['name','lot_stock_id','partner_id', 'code'];

            jsonRpc.searchRead($scope.model, $scope.domain, $scope.fields)
                .then(function(response) {
                    console.log(response.records);

                    angular.forEach(response.records, function(child){
                        //console.log(child.id);
                        $scope.warehouses.push(child);
                    });
                    console.log($scope.customers);
                }),function(response){
                console.log(response);
            }
        }
        $scope.allwarehouses();

        $scope.allroutes = function (){
            console.log('working');
            jsonRpc.odoo_server = $scope.host;
            $scope.model = 'stock.location.route';
            $scope.domain = [];
            $scope.fields = ['name', 'create_date'];

            jsonRpc.searchRead($scope.model, $scope.domain, $scope.fields)
                .then(function(response) {
                    console.log("response.records");

                    angular.forEach(response.records, function(child){
                        //console.log(child.id);
                        $scope.routes.push(child);
                    });
                    console.log($scope.customers);
                }),function(response){
                console.log(response);
            }
        }
        $scope.allroutes();

        $scope.allocations = function () {
            jsonRpc.odoo_server = $scope.host;
            $scope.model = 'stock.location';
            $scope.domain = [];
            $scope.fields = ['usage', 'name'];

            jsonRpc.searchRead($scope.model, $scope.domain, $scope.fields)
                .then(function (response) {
                    angular.forEach(response.records, function(child){
                        $scope.locations.push(child);
                    });
                }), function(response){

                }
        }
        $scope.allocations();

        $scope.alluoms = function () {
            jsonRpc.odoo_server = $scope.host;
            $scope.model = 'product.uom';
            $scope.domain = [];
            $scope.fields = ['category_id', 'name'];

            jsonRpc.searchRead($scope.model, $scope.domain, $scope.fields)
                .then(function (response) {
                    angular.forEach(response.records, function(child){
                        $scope.uoms.push(child);
                    });
                }), function(response){

            }
        }
        $scope.alluoms();


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