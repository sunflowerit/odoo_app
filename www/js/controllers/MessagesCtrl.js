app.controller('MessagesCtrl', [
    '$scope', '$http', 'jsonRpc','$state', '$ionicPopover', '$timeout','ionicMaterialInk','ionicMaterialMotion', '$ionicPopup', '$stateParams',
    '$location','$rootScope','$ionicHistory',
    function(
        $scope, $http, jsonRpc, $state, $ionicPopover, $timeout,ionicMaterialInk, ionicMaterialMotion, $ionicPopup, $stateParams, $location, $rootScope, $ionicHistory, data){
        ionicMaterialInk.displayEffect();

    $scope.messages = [{
        "id":1,
        "name":"News from Administrator",
        "face":"img/material4.jpg",
        "msg": "new accounts item added",
        "email": "dan@gmail.com",
    },{
        "id":2,
        "name":"News from Paul",
        "face":"img/material4.jpg",
        "msg": "merchandize delivered",
        "email": "kip@gmail.com",
    }];

        var messages = '<ion-popover-view>' +
            '   <ion-content class="padding">' +
            '       <li> Me</li>' +
            '       <li>About</li>' +
            '       <li>Logout</li>' +
            '   </ion-content>' +
            '</ion-popover-view>';

        $scope.popover = $ionicPopover.fromTemplate(messages, {
            scope: $scope
        });
        $scope.closePopover = function () {
            $scope.popover.hide();
        };
        //Cleanup the popover when we're done with it!
        $scope.$on('$destroy', function () {
            $scope.popover.remove();
        });

    $scope.single_messages = function (id) {
        $state.go('app.messages_more', {"MessageId":id});
    }
        // Toggle Code Wrapper
    var code = document.getElementsByClassName('code-wrapper');
    for (var i = 0; i < code.length; i++) {
        code[i].addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }
}]);
