'use strict';
angular.module('starter.controllers', [])
app.controller('AppCtrl', function($scope, $rootScope,  $http, $ionicModal, $ionicPopover, $state, $timeout) {


    //$scope.showspiner = false;
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }
    //Expanding Menus

        $scope.theme = 'ionic-sidemenu-red';

        $scope.tree =
            [{
                id: 1,
                level: 0,
                name: 'Depot',
                icon: "icon ion-ios-briefcase",
                items: [{
                    id: 10,
                    level: 1,
                    name: 'Inventory Control',
                    icon: "ion-funnel",
                    state: 'app.inventory_control',
                    items: null
                }, {
                    id: 11,
                    level: 1,
                    name: 'Traceability',
                    icon: "ion-clock",
                    state:'app.traceability',
                    items: null
                }, {
                    id: 12,
                    level: 1,
                    name: 'Configuration',
                    icon: "ion-gear-b",
                    state:'app.configuration',
                    items: null
                }]
            }, {
                id: 2,
                name: "Project",
                icon: "ion-calendar",
                level: 0,
                state: 'app.project'
            }];




    /* var messages = '<ion-popover-view>' +
         '   <ion-content class="padding">' +
         '       <li>'+test+ '</li>' +
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
     });*/

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})
;