// QuickPay Starter App

var app = angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'ngCookies', 'odoo', 'ionic-material', 'ionic.ion.autoListDivider', 'ionMdInput', 'satellizer'])

app.run(function($ionicPlatform , $ionicPopup) {
    $ionicPlatform.ready(function() {

        // Check for network [internet] connection
        if(window.Connection) {
          if(navigator.connection.type == Connection.NONE) {
            $ionicPopup.confirm({
              title: 'No Internet Connection',
              content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
            })
            .then(function(result) {
              if(!result) {
                ionic.Platform.exitApp();
              }
            });
          }
        }
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {

    $httpProvider.defaults.withCredentials = true;

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);

    // setup an abstract state for the tabs directive
 
    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })
        .state('app.login', {
            url: '/login',
            views: {
                'menuContent': {
                    templateUrl: 'templates/login.html',
                    controller: 'LoginCtrl'
                }
            }
        })

        .state('app.messages', {
            url: '/messages',
            views: {
                'menuContent': {
                    templateUrl: 'templates/messages.html',
                    controller: 'MessagesCtrl'
                },
                'fabContent': {
                    template: '<button id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-plus"></i></button>',
                    controller: function ($timeout) {
                    }
                }
            }
        })

        .state('app.flights', {
            url: '/flights',
            views: {
                'menuContent': {
                    templateUrl: 'templates/flights.html',
                    controller: 'FlightsCtrl'
                }
            }
        })

        .state('app.products', {
            url: '/products',
            views: {
                'menuContent': {
                    templateUrl: 'templates/products.html',
                    controller: 'ProductsCtrl'
                }
            }
        })
        .state('app.sales', {
            url: '/sales',
            views: {
                'menuContent': {
                    templateUrl: 'templates/sales.html',
                    controller: 'SalesCtrl'
                }
            }
        })

        .state('app.accounting', {
            url: '/accounting',
            views: {
                'menuContent': {
                    templateUrl: 'templates/accounting.html',
                    controller: 'AccountingCtrl'
                }
            }
        })

        .state('app.purchases',{
            url:'/purchases',
            views:{
                'menuContent':{
                    templateUrl:'templates/purchases.html',
                    controller: 'PurchasesCtrl'
                }
            }
        })

        .state('app.hr', {
            url: '/hr',
            views: {
                'menuContent': {
                    templateUrl: 'templates/hr.html',
                    controller: 'HrCtrl'
                }
            }
        })
        .state('app.reporting', {
            url: '/reporting',
            views: {
                'menuContent': {
                    templateUrl: 'templates/reporting.html',
                    controller: 'ReportingCtrl'
                }
            }
        })
        .state('app.contacts', {
            url: '/contacts',
            views: {
                'menuContent': {
                    templateUrl: 'templates/contacts.html',
                    controller: 'ContactsCtrl'
                }
            }
        })

        .state('app.contacts_single', {
        url: '/contacts/:ContactId',
        views: {
            'menuContent': {
                templateUrl: 'templates/single-contact.html',
                controller: 'SingleContactCtrl'
            }
        }
    })

        .state('app.products_single', {
            url: '/products/:ProductId',
            views: {
                'menuContent': {
                    templateUrl: 'templates/single-product.html',
                    controller: 'SingleProductCtrl'
                }
            }
        })

        .state('app.single_sale', {
            url: '/sales/:SaleId',
            views: {
                'menuContent': {
                    templateUrl: 'templates/single-sale.html',
                    controller: 'SingleSaleCtrl'
                }
            }
        })

        .state('app.single_account', {
            url: '/accounting/:AccountId',
            views: {
                'menuContent': {
                    templateUrl: 'templates/single_account.html',
                    controller: 'SingleAccountCtrl'
                }
            }
        })

    // if none of the above states are matched, use this as the fallback
   //$urlRouterProvider.otherwise('/app/accounting');
   $urlRouterProvider.otherwise('/app/login');
});