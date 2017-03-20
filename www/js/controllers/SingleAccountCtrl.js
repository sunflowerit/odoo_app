//app.controller('ContactsCtrl', function( $ionicSlideBoxDelegate, $scope, $http, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {

app.controller('SingleAccountCtrl', [
    '$scope', '$http', 'jsonRpc','$state','$timeout','ionicMaterialInk','ionicMaterialMotion', '$ionicPopup', '$stateParams',
    '$location','$rootScope','$ionicHistory',
    function(
        $scope, $http, jsonRpc, $state, $timeout,ionicMaterialInk, ionicMaterialMotion, $ionicPopup, $stateParams, $location, $rootScope, $ionicHistory, data){
        ionicMaterialInk.displayEffect();
        $scope.host = "http://o.websandbox.nl";
        //$scope.host = "http://192.168.0.10/";
        $scope.singleSale = function (){
            jsonRpc.odoo_server = $scope.host;
            $scope.model = 'account.invoice';
            $scope.domain = [['id', '=', $stateParams.AccountId]];
            $scope.fields = ['internal_number', 'date_invoice', 'date_due', 'partner_id', 'amount_total', 'residual', 'state', 'user_id', 'reference'];


            jsonRpc.searchRead($scope.model, $scope.domain, $scope.fields)
                .then(function(response) {
                    //
                    $scope.account = response.records[0];

                }),function(response){
                //console.log(response);
            }
        }
        $scope.singleSale();

        //Updating Info
        $scope.update = function (id, list_price, name, qty_available){
            console.log('Product Id:' + id);
            jsonRpc.odoo_server = $scope.host;
            //$scope.id = id;
            $scope.model = 'product.template';
            $scope.domain = [];
            $scope.fields = [('list_price', 'name', 'qty_available')];
            $scope.method = 'write';
            $scope.args = [[id], {
                'list_price': list_price,
                'name': name,
                'qty_available':qty_available

            }];
            $scope.kwargs = {};

            jsonRpc.call($scope.model, $scope.method, $scope.args, $scope.kwargs)

                .then(function(response) {

                    if(response) {


                        $ionicPopup.alert({
                            title: 'Product Updated',
                            template: 'The Product has been updated Successfully',
                            okText: 'OK',
                        })

                    }else{
                        console.log('Product not updated');
                    }

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