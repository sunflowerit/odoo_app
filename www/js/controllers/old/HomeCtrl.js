app.controller('HomeCtrl', function( $ionicSlideBoxDelegate, $scope, $http, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    
  var deploy = new Ionic.Deploy();
  // Update app code with new release from Ionic Deploy
  /*$scope.doUpdate = function() {
    deploy.update().then(function(res) {
      $scope.updatesuccess = "Ionic Deploy: Update Success!";
      console.log('Ionic Deploy: Update Success! ', res);
    }, function(err) {
      $scope.updatefailed = "Ionic Deploy: Update error!";
      console.log('Ionic Deploy: Update error! ', err);
    }, function(prog) {
      $scope.updatefailed = "Ionic Deploy: Progress...";
      console.log('Ionic Deploy: Progress... ', prog);
      
    });
  };
  */
  // Check Ionic Deploy for new code
  $scope.checkForUpdates = function() {
    ///check for updates
    $scope.checkupdate = "EASL Deploy: Checking for updates...";
    $scope.updateavailable = "EASL Deploy: Update available...Will take upto 5 minutes to download and install.";
    console.log('EASL Deploy: Checking for updates');
    deploy.check().then(function(hasUpdate) {
      $scope.updateavailable = "EASL Deploy: Update available...";
      $scope.updating = "EASL Deploy: Updating application...";
      console.log('EASL Deploy: Update available: ' + hasUpdate);
      $scope.hasUpdate = hasUpdate;
      
        if (hasUpdate){
          /// install updates
          deploy.update().then(function(res) {
          $scope.updatesuccess = "EASL Deploy: Update Success!";
          console.log('Ionic Deploy: Update Success! ', res);
          }, function(err) {
            $scope.updatefailed = "EASL Deploy: Update error!";
            console.log('Ionic Deploy: Update error! ', err);
          }, function(prog) {
            $scope.updatefailed = "EASL Deploy: Progress...update error";
            console.log('EASL Deploy: Progress... ', prog);
            
          });
        }else{
          /// no updates to install
          $scope.noupdate = "EASL Deploy: No Update Available...";
        }
        

    }, function(err) {
      $scope.checkupdatefail = "EASL Deploy: Unable to check for updates";
      console.error('EASL Deploy: Unable to check for updates', err);
    });
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
})
;