app.controller('SettingsCtrl', [
    '$scope', '$http', 'jsonRpc','$state','$timeout','ionicMaterialInk','ionicMaterialMotion', '$ionicPopup', '$stateParams',
    '$location','$rootScope','$ionicHistory',
    function(
        $scope, $http, jsonRpc, $state, $timeout,ionicMaterialInk, ionicMaterialMotion, $ionicPopup, $stateParams, $location, $rootScope, $ionicHistory, data){

        $scope.settingsList = [
            { icon: "ion-ios-calculator", text: "Accounting", checked: true },
            { icon:"ion-ios-briefcase", text: "Depot", checked: false },
            { icon:"ion-android-plane", text: "Flights", checked: false },
            { icon:"ion-person", text: "Human Resource", checked: true },
            { icon:"ion-email", text: "Messages", checked: true },
            { icon:"ion-ios-cart", text: "Products", checked: false },
            { icon:"ion-calendar", text: "Projects", checked: true },
            { icon:"ion-bag", text: "Purchases", checked: true },
            { icon:"ion-calendar", text: "Reporting", checked: false },
            { icon:"ion-ios-cart", text: "Sales", checked: true },
            { icon:"ion-ios-home", text: "Warehouse", checked: true },
        ];


        $scope.pushNotificationChange = function() {
            console.log('Push Notification Change', $scope.pushNotification.checked);
        };

        $scope.pushNotification = { checked: true };
        $scope.emailNotification = 'Subscribed';

    }]);