//app.controller('ContactsCtrl', function( $ionicSlideBoxDelegate, $scope, $http, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {

app.controller('SalesCtrl', [
    '$scope', '$http', 'jsonRpc','$state','$timeout','ionicMaterialInk','ionicMaterialMotion', '$ionicPopup', '$stateParams',
    '$location','$rootScope','$ionicHistory',
    function(
        $scope, $http, jsonRpc, $state, $timeout,ionicMaterialInk, ionicMaterialMotion, $ionicPopup, $stateParams, $location, $rootScope, $ionicHistory, data){
        ionicMaterialInk.displayEffect();

        $scope.host = "http://o.websandbox.nl";
        $scope.customers = [];
        $scope.sales_quotations = [];
        $scope.sales_orders = [];

        $scope.allsales_quotations = function (){
            console.log('working');
            jsonRpc.odoo_server = $scope.host;
            $scope.model = 'sale.order';
            $scope.domain = [['state', '=', 'draft']];
            $scope.fields = ['name', 'date', 'partner_id', 'amount_total', 'state'];

            jsonRpc.searchRead($scope.model, $scope.domain, $scope.fields)
                .then(function(response) {
                    console.log("response.records");

                    angular.forEach(response.records, function(child){
                        //console.log(child.id);
                        $scope.sales_quotations.push(child);
                    });
                    console.log($scope.customers);
                }),function(response){
                console.log(response);
            }
        }
        $scope.allsales_quotations();
            $scope.single_sale = function (id) {
                $state.go('app.single_sale', {"SaleId":id});
            }


        $scope.allsales_orders= function (){
            console.log('working');
            jsonRpc.odoo_server = $scope.host;
            $scope.model = 'sale.order';
            $scope.domain = [['state', '=', 'manual']];
            $scope.fields = ['name', 'date', 'partner_id', 'amount_total', 'state'];

            jsonRpc.searchRead($scope.model, $scope.domain, $scope.fields)
                .then(function(response) {
                    console.log("response.records");

                    angular.forEach(response.records, function(child){
                        //console.log(child.id);
                        $scope.sales_orders.push(child);
                    });
                    console.log($scope.customers);
                }),function(response){
                console.log(response);
            }
        }
        $scope.allsales_orders();

        $scope.single_contact = function (id){
            $state.go('app.contacts/' +id);
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