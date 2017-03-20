//app.controller('ContactsCtrl', function( $ionicSlideBoxDelegate, $scope, $http, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {

app.controller('PurchasesCtrl', [
    '$scope', '$http', 'jsonRpc','$state','$timeout','ionicMaterialInk','ionicMaterialMotion', '$ionicPopup', '$stateParams',
    '$location','$rootScope','$ionicHistory',
    function(
        $scope, $http, jsonRpc, $state, $timeout,ionicMaterialInk, ionicMaterialMotion, $ionicPopup, $stateParams, $location, $rootScope, $ionicHistory, data){
        ionicMaterialInk.displayEffect();

        $scope.host = "http://o.websandbox.nl";
        $scope.quotations = [];
        $scope.purchase_orders = [];
        $scope.incoming_products = [];

        $scope.allquotations = function (){
            jsonRpc.odoo_server = $scope.host;
            $scope.model = 'purchase.order';
            $scope.domain = [['state', '=', 'draft']];
            $scope.fields = ['name','partner_id','amount_total', 'state'];

            jsonRpc.searchRead($scope.model, $scope.domain, $scope.fields)
                .then(function(response) {
                    console.log(response.records);

                    angular.forEach(response.records, function(child){
                        //console.log(child.id);
                        $scope.quotations.push(child);
                    });
                    console.log($scope.customers);
                }),function(response){
                console.log(response);
            }
        }
        $scope.allquotations();

        $scope.allpurchase_orders = function (){
            jsonRpc.odoo_server = $scope.host;
            $scope.model = 'purchase.order';
            $scope.domain = [['state', '=', 'approved']];
            $scope.fields = ['name','partner_id','amount_total', 'state'];

            jsonRpc.searchRead($scope.model, $scope.domain, $scope.fields)
                .then(function(response) {
                    console.log(response.records);

                    angular.forEach(response.records, function(child){
                        //console.log(child.id);
                        $scope.purchase_orders.push(child);
                    });
                    console.log($scope.customers);
                }),function(response){
                console.log(response);
            }
        }
        $scope.allpurchase_orders();

        $scope.allincoming_products = function (){
            jsonRpc.odoo_server = $scope.host;
            $scope.model = 'stock.move';
            $scope.domain = [['state', '=', 'assigned']];
            $scope.fields = ['origin', 'product_qty', 'name'];

            jsonRpc.searchRead($scope.model, $scope.domain, $scope.fields)
                .then(function(response) {

                    angular.forEach(response.records, function(child){
                        //console.log(child.id);
                        $scope.incoming_products.push(child);
                    });

                }),function(response){
            }
        }
        $scope.allincoming_products();

        /*$scope.single_contact = function (id){
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
         */
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