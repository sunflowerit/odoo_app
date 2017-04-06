//app.controller('ContactsCtrl', function( $ionicSlideBoxDelegate, $scope, $http, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {

app.controller('ProjectCtrl', [
    '$scope', '$http', 'jsonRpc','$state','$timeout','ionicMaterialInk','ionicMaterialMotion', '$ionicPopup', '$stateParams',
    '$location','$rootScope','$ionicHistory',
    function(
        $scope, $http, jsonRpc, $state, $timeout,ionicMaterialInk, ionicMaterialMotion, $ionicPopup, $stateParams, $location, $rootScope, $ionicHistory, data){
        ionicMaterialInk.displayEffect();

        $scope.host = "http://o.websandbox.nl";
        $scope.employees = [];
        $scope.departments = [];


        $scope.allemployees = function (){
            jsonRpc.odoo_server = $scope.host;
            $scope.model = 'hr.employees';
            $scope.domain = [];
            $scope.fields = ['name','type','image'];

            jsonRpc.searchRead($scope.model, $scope.domain, $scope.fields)
                .then(function(response) {
                    console.log(response.records);

                    angular.forEach(response.records, function(child){
                        //console.log(child.id);
                        $scope.employees.push(child);
                    });
                    console.log($scope.customers);
                }),function(response){
                console.log(response);
            }
        }
        $scope.allemployees();

        $scope.alldepartments = function (){
            console.log('working');
            jsonRpc.odoo_server = $scope.host;
            $scope.model = 'product.template';
            $scope.domain = [['type', '=', 'service']];
            $scope.fields = ['name'];

            jsonRpc.searchRead($scope.model, $scope.domain, $scope.fields)
                .then(function(response) {
                    console.log("response.records");

                    angular.forEach(response.records, function(child){
                        //console.log(child.id);
                        $scope.products_service.push(child);
                    });
                    console.log($scope.customers);
                }),function(response){
                console.log(response);
            }
        }
        $scope.alldepartments();


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