//app.controller('ContactsCtrl', function( $ionicSlideBoxDelegate, $scope, $http, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {

app.controller('SingleContactCtrl', [
    '$scope', '$http', 'jsonRpc','$state','$timeout','ionicMaterialInk','ionicMaterialMotion', '$ionicPopup', '$stateParams',
    '$location','$rootScope','$ionicHistory',
    function(
        $scope, $http, jsonRpc, $state, $timeout,ionicMaterialInk, ionicMaterialMotion, $ionicPopup, $stateParams, $location, $rootScope, $ionicHistory, data){
        ionicMaterialInk.displayEffect();
        console.log($stateParams.ContactId);
        $scope.host = "http://o.websandbox.nl";
        //$scope.host = "http://192.168.0.10/";
        //$scope.customers = [];
       $scope.singlecustomer = function (){
            console.log('working');
            jsonRpc.odoo_server = $scope.host;
            $scope.model = 'res.partner';
            $scope.domain = [['id', '=', $stateParams.ContactId]];
            $scope.fields = ['name', 'email', 'website', 'phone', 'mobile', 'city', 'street', 'zip', 'image'];

            jsonRpc.searchRead($scope.model, $scope.domain, $scope.fields)
                .then(function(response) {
                   //
                    $scope.contact = response.records[0];
                    console.log($scope.contact);
                }),function(response){
                //console.log(response);
            }
        }
        $scope.singlecustomer();

        //Updating Info
        $scope.update_record = function (id, name, email,  website, phone, mobile,  city, street, zip){

            jsonRpc.odoo_server = $scope.host;
            //$scope.id = id;
            $scope.model = 'res.partner';
            $scope.domain = [];
            $scope.fields = [('name', 'email', 'website', 'phone', 'mobile', 'city', 'street', 'zip', 'image')];
            $scope.method = 'write';
            $scope.args = [[id], {
                'name': name,
                'email': email,
                'website':website,
                'phone': phone,
                'mobile': mobile,
                'city': city,
                'street':street,
                'zip':zip

            }];
            $scope.kwargs = {};

            jsonRpc.call($scope.model, $scope.method, $scope.args, $scope.kwargs)

                .then(function(response) {

                    if(response) {


                        $ionicPopup.alert({
                            title: 'Edit Successful',
                            template: 'Contact info has been Updated',
                            okText: 'OK',
                        })
                    }else{
                        //
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