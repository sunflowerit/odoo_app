app.controller('MessagingCtrl', function( $ionicSlideBoxDelegate, $scope, $http, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    
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
})
;