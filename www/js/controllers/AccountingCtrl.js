//app.controller('ContactsCtrl', function( $ionicSlideBoxDelegate, $scope, $http, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {

app.controller('AccountingCtrl', [
    '$scope', '$http', 'jsonRpc','$state','$timeout','ionicMaterialInk','ionicMaterialMotion', '$ionicPopup', '$stateParams',
    '$location','$rootScope','$ionicHistory',
    function(
        $scope, $http, jsonRpc, $state, $timeout,ionicMaterialInk, ionicMaterialMotion, $ionicPopup, $stateParams, $location, $rootScope, $ionicHistory, data){
        ionicMaterialInk.displayEffect();

        $scope.host = "http://o.websandbox.nl";
        $scope.invoices = [];
        $scope.accounting_refunds = [];
        $scope.accounting_receipts = [];
        $scope.accounting_payments = [];

        $scope.allinvoices = function (){
            console.log('working');
            jsonRpc.odoo_server = $scope.host;
            $scope.model = 'account.invoice';
            $scope.domain = [['type', '=', 'out_invoice']];
            $scope.fields = ['number','partner_id','amount_total', 'state'];

            jsonRpc.searchRead($scope.model, $scope.domain, $scope.fields)
                .then(function(response) {
                    console.log(response.records);

                    angular.forEach(response.records, function(child){
                        //console.log(child.id);
                        $scope.invoices.push(child);
                    });
                    console.log($scope.customers);
                }),function(response){
                console.log(response);
            }
        }
        $scope.allinvoices();
            $scope.single_account = function (id) {
                $state.go('app.single_account', {"AccountId":id});
            }


        $scope.allaccounting_refunds = function (){
            console.log('working');
            jsonRpc.odoo_server = $scope.host;
            $scope.model = 'account.invoice';
            $scope.domain = [['type', '=', 'out_refund']];
            $scope.fields = ['number','partner_id','amount_total', 'state'];

            jsonRpc.searchRead($scope.model, $scope.domain, $scope.fields)
                .then(function(response) {
                    console.log(response.records);

                    angular.forEach(response.records, function(child){
                        //console.log(child.id);
                        $scope.accounting_refunds.push(child);
                    });
                    console.log($scope.customers);
                }),function(response){
                console.log(response);
            }
        }
        $scope.allaccounting_refunds();

        $scope.allaccounting_receipts = function (){
            jsonRpc.odoo_server = $scope.host;
            $scope.model = 'account.voucher';
            $scope.domain = []; //['type', '=', 'sale']
            $scope.fields = ['number', 'state', 'partner_id', 'journal_id', 'type', 'amount'];

            jsonRpc.searchRead($scope.model, $scope.domain, $scope.fields)
                .then(function(response) {

                    angular.forEach(response.records, function(child){
                        //console.log(child.id);
                        $scope.accounting_receipts.push(child);
                    });

                }),function(response){
            }
        }
        $scope.allaccounting_receipts ();

        $scope.allaccounting_payments = function (){
            jsonRpc.odoo_server = $scope.host;
            $scope.model = 'account.voucher';
            $scope.domain = [['type', '=', 'receipt']];
            $scope.fields = ['number', 'state', 'partner_id', 'journal_id', 'type', 'amount'];

            jsonRpc.searchRead($scope.model, $scope.domain, $scope.fields)
                .then(function(response) {

                    angular.forEach(response.records, function(child){
                        //console.log(child.id);
                        $scope.accounting_payments.push(child);
                    });

                }),function(response){
            }
        }
        $scope.allaccounting_payments ();

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