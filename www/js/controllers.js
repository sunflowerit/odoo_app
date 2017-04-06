
'use strict';
angular.module('starter.controllers', [])

.controller('FriendsCtrl', function($scope, $http, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(false);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('Mymap', function(NgMap) {
  NgMap.getMap().then(function(map) {
    console.log(map.getCenter());
    console.log('markers', map.markers);
    console.log('shapes', map.shapes);
  });
})



.controller('ProfileCtrl', function($scope, $http, $stateParams, $timeout, $ionicPopup, ionicMaterialMotion, ionicMaterialInk) {
  
    $http.get('http://localhost/quickpay/api/user').success(function(data, status, headers, config) {
        $scope.user = data.user;
        $scope.loginlogs = data.loginlogs;
        $scope.payments = data.payments;
    }).error(function(data, status) { 
        //$scope.errors = data.errors;
    });   
    // Set Header {former profile}
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);
    

    ///popup///
    // Triggered on a button click, or some other target
        $scope.showPopup = function() {
          $scope.data = {};

          // An elaborate, custom popup
          var myPopup = $ionicPopup.show({
            template: '<input type="password" ng-model="data.wifi">',
            title: 'Enter Wi-Fi Password',
            subTitle: 'Please use normal things',
            scope: $scope,
            buttons: [
              { text: 'Cancel' },
              {
                text: '<b>Save</b>',
                type: 'button-positive',
                onTap: function(e) {
                  if (!$scope.data.wifi) {
                    //don't allow the user to close unless he enters wifi password
                    e.preventDefault();
                  } else {
                    return $scope.data.wifi;
                  }
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

         };

    ///end of popup///resetpwd

    $scope.resetpwd = function() {
        $scope.error = '';
        $scope.data = {};
        console.log($scope.user.firstname);

        $scope.data.newpin = "";
        $scope.data.re_newpin = "";
        $scope.$watch('data.newpin + data.re_newpin', function() {
        if($scope.data.newpin == $scope.data.re_newpin){
            console.log('they are the same');
            $scope.verify_resetpin = true; 
        }else{
            $scope.verify_resetpin = false;
        }
        });
        
            var form = '<b><small ng-bind="resetpwdmsg" style="color:green;"></small></b> \
                        <small ng-bind="error" style="color:red;"></small> \
                        <div ng-if="!resetpwdmsg">\
                        <input type="password" placeholder="Old PIN" ng-model="data.oldpin"> \
                        <br/> \
                        <input type="password" placeholder="New PIN" ng-model="data.newpin"> \
                        <br/> \
                        <input type="password" placeholder="Confirm PIN" ng-model="data.re_newpin"> \
                        <small ng-if="data.newpin && data.re_newpin && verify_resetpin" style="color:green;">Passwords Match</small> \
                        <p ng-if="waitresetpwdmsg" style="color:green;">Please wait as new PIN is configured</p> \
                        <small ng-if="data.newpin && data.re_newpin && !verify_resetpin" style="color:red;">Passwords Do not Match</small> \
                        </div> ';
          // An elaborate, custom popup
          var myPopup = $ionicPopup.show({
            template: form,
            title: 'Reset Password',
            subTitle: 'Provide Old and New PINs (Should be 4 digits)',
            scope: $scope,
            buttons: [
              { text: 'close' },
              {
                text: '<b>Save</b>',
                type: 'button-positive',
                onTap: function(e) {
                  if ($scope.data.oldpin && $scope.data.newpin && $scope.data.re_newpin) {
                    //don't allow the user to close unless he enters wifi password
                    
                    if ($scope.data.newpin == $scope.data.re_newpin){

                        $scope.waitresetpwdmsg = true;
                        
                        $http.post('http://localhost/quickpay/resetpwd',{
                        'id': $scope.user.id,
                        'password': $scope.data.newpin,
                        'old_password':$scope.data.oldpin,
                        }
                        
                        ).success(function(data, status, headers, config) {
                            $scope.resetpwdmsg = data.resetpwdmsg;

                            var request = '{"msisdn":"'+$scope.user.mobile+'", "sms":"QuickPay : Your PIN has been Changed."}';

                                $http.post('http://162.250.121.226/quick/process.asmx/Notify',{
                                    'request': request
                                    }).success(function(data, status, headers, config) {
                                        console.log('success');
                                        console.log(data);
                                    }).error(function(data, status) { 
                                        console.log('failed');
                                    });


                          
                        //console.log('success password saved');
                        }).error(function(data, status) { 
                        //$scope.errors = data.errors;

                        });
                        e.preventDefault();

                    }else{
                        e.preventDefault();
                    }
    
                  } else {

                    //return $scope.oldpin;
                    console.log('empty fields');
                    $scope.error = 'All fields are required';
                    e.preventDefault();
                    console.log($scope.user.password);

                  }

                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
            $scope.error = null;
            $scope.resetpwdmsg = null;
            $scope.data = {};

          });

         };

        ////////end of popup reset pwd ///////////////

        //// profile picture upload //////////////////

        $scope.upload_profile_pic = function(){
            $scope.profile_pic = {};
            $scope.profile_pic.src = "";
            console.log($scope.profile_pic);
            $http.post('http://localhost/quickpay/api/profilepic',{
            'profile_pic' : $scope.profile_pic,
            }
            ).success(function(data, status, headers, config) {

            console.log(data.filename);
            }).error(function(data, status) { 
            //$scope.errors = data.errors;
            });

        }

})

.controller('recoverpwdCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    $scope.$parent.clearFabs();

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
})


.controller('SignupCtrl', function($scope, $http, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    // Set Header
    $scope.faults = [];

        $scope.is_merchant = false;
    //if ($scope.registereduser){

        $scope.verified =false;
        $scope.auth_code_typed = "";
        $scope.$watch('auth_code + auth_code_typed', function() {
        if($scope.auth_code_typed == $scope.auth_code){
            console.log('they are the same');
            $scope.verified = true; 
        }
        });

        $scope.pwdmatch =false;
        $scope.password = "";
        $scope.re_password = "";
        $scope.$watch('password + re_password', function() {
        if($scope.password === $scope.re_password){ 
            $scope.pwdmatch =true;  
        }else{
            $scope.pwdmatch =false;
        }
        });
    //}
   
    $scope.save_password = function(id){
        $scope.waitforemail = "Please wait....system is configure your account";
        //console.log("function working");

        $http.post('http://localhost/quickpay/savepwd',{

            'id': id,
            'password': $scope.password,

        }
        
        ).success(function(data, status, headers, config) {
            $scope.pwdsaved = true;
          

        console.log('success password saved');
        }).error(function(data, status) { 
        //$scope.errors = data.errors;

        });
    }
    $scope.signup = function(){

        if($scope.merchant){
            $scope.is_merchant = true;
        }else{
            $scope.is_merchant = false;
        }

        $http.post('http://localhost/quickpay/register',{
            'firstname': $scope.firstname,
            'lastname': $scope.lastname,
            'mobile': $scope.mobile,
            'email': $scope.email,

        }).success(function(data, status, headers, config) {
            $scope.registereduser = data.registereduser;
            $scope.auth_code = data.registereduser.auth_code;

 var request = '{"msisdn":"'+data.registereduser.mobile+'", "sms":"QuickPay Access Code is : '+data.registereduser.auth_code+'"}';

            $http.post('http://162.250.121.226/quick/process.asmx/Notify',{
                'request': request
                }).success(function(data, status, headers, config) {
                    console.log('success');
                    console.log(data);
                }).error(function(data, status) { 
                    console.log('failed');
                });
                
        console.log(data);
        //console.log('successcurrentuser');
        }).error(function(data, status) { 
        //$scope.errors = data.errors;

        });
   
        console.log('register');
    }
    
    $scope.merchant_payment = false;
    $scope.payment_mpesa = false;
    $scope.payment_bank = false;
    $scope.payment_mpesa_paybillno = false;
    $scope.payment_mpesa_tillno = false;
    $scope.payment_mpesa_phone = false;
    $scope.payment_mpesa_paybill = function(){
        $scope.payment_mpesa_paybillno = true;
    }
    $scope.payment_mpesa_paybill_back = function(){
        $scope.payment_mpesa_paybillno = false;
    }
    $scope.payment_mpesa_buygoods = function(){
        $scope.payment_mpesa_tillno = true;

    }
    $scope.payment_mpesa_buygoods_back = function(){
        $scope.payment_mpesa_tillno = false;
    }

    $scope.payment_mpesa_mobile = function(){
        $scope.payment_mpesa_phone = true;
    }
    $scope.payment_mpesa_mobile_back = function(){
        $scope.payment_mpesa_phone = false;
    }


    $scope.merchant_payment_mpesa = function(){
        $scope.payment_mpesa = true;
    }
    $scope.merchant_payment_bank = function(){
        $scope.payment_bank = true;
    }
    $scope.merchant_payment_back = function(){
        $scope.merchant_payment = false;
    }
    $scope.payment_mpesa_back = function(){
        $scope.payment_mpesa = false;
    }
    $scope.payment_bank_back = function(){
        $scope.payment_bank = false;
    }

    $scope.register_merchant = function(){
        $scope.merchant_payment = true; //must be true

        $http.post('http://localhost/quickpay/register_merchant',{
            'user_id': $scope.registereduser.id,
            'name': $scope.businessname,
            'location': $scope.businesslocation,
            'telephone': $scope.telno,
            'contact_person': $scope.contactperson,
            'contact_number': $scope.contactno,

        }
        
        ).success(function(data, status, headers, config) {
            $scope.registeredmerchant = data.registeredmerchant;
           
        console.log($scope.registeredmerchant);

        }).error(function(data, status) { 


        });
   
        
    }

    //$scope.mpesadata = {};

    $scope.merchant_payment_mpesa_register = function(){
            merchant_id
            console.log($scope.paybillno);
    }

    $scope.$parent.clearFabs();

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ActivityCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
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

.controller('MymenuCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

})

.controller('CardsCtrl', function($scope, $location, $http, $ionicPopup, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    
    $http.get('http://localhost/quickpay/api/user').success(function(data, status, headers, config) {
        $scope.user = data.user;
        $scope.cards = data.cards;
        console.log(data);
        //console.log('successcurrentuser');
    }).error(function(data, status) { 
        //$scope.errors = data.errors;

    });

    $scope.singlecard = function(id){

        $http.get('http://localhost/quickpay/api/singlecard/' +id
            
        ).success(function(data, status, headers, config) {
            //$scope.user = data.user;
            $scope.thiscard = data.card;

        }).error(function(data, status) { 
        //$scope.errors = data.errors;

        });
    }

    $scope.editcardname = function(id) {
        $scope.error = '';
        $scope.data = {};
        
            var form = '<b><small ng-bind="resetpwdmsg" style="color:green;"></small></b> \
                        <small ng-bind="error" style="color:red;"></small> \
                        <input type="text" placeholder="New Name" ng-model="data.newname"> \
                        <br/> ';

          // An elaborate, custom popup
          var myPopup = $ionicPopup.show({
            template: form,
            title: 'Edit Card Name',
            subTitle: 'Provide only Characters',
            scope: $scope,
            buttons: [
              { text: 'close' },
              {
                text: '<b>Save</b>',
                type: 'button-positive',
                onTap: function(e) {
                  if ($scope.data.newname ) {
                    //don't allow the user to close unless he enters wifi password
                        console.log(id);
                        $http.post('http://localhost/quickpay/editcardname',{
                        'id': id,
                        'newname': $scope.data.newname,
                        }
                        
                        ).success(function(data, status, headers, config) {
                            $scope.thiscard = data.thiscard;
                            //$scope.resetpwdmsg = data.resetpwdmsg;
                          
                        console.log(data);
                        }).error(function(data, status) { 
                        //$scope.errors = data.errors;

                        });
                        //e.preventDefault();

                  } else {

                    //return $scope.oldpin;
                    console.log('empty fields');
                    $scope.error = 'All fields are required';
                    e.preventDefault();
                    console.log($scope.user.password);

                  }

                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
            $scope.error = null;
            $scope.resetpwdmsg = null;
            $scope.data = {};

          });

         };



    $scope.deletecard = function(id){

        //$scope.showConfirm = function() {
         var confirmPopup = $ionicPopup.confirm({
           title: 'Delete Card!!',
           template: 'Are you sure you want to delete this card?'
         });
         confirmPopup.then(function(res) {
           if(res) {

            $http.delete('http://localhost/quickpay/api/singlecard/' +id+'/delete').success(function(data, status, headers, config) {
                $scope.cards = data.cards;
                console.log('deleted');
                $scope.thiscard = null;
            }).error(function(data, status) { 
                console.log('failed');              
            });
           } else {
             console.log('You are not sure');
           }
         });
        //};
    }

    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

})


.controller('AddcardCtrl', function( $scope, $http, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion ) {

      $scope.$watch('number', function() {

        console.log( "$scope.number");
   

        if(/^(34)|^(37)/.test($scope.number2)) {
            
            $scope.cardType = "American Express";
        }else{
            $scope.cardType = "none";
        }

        });

        $http.get('http://localhost/quickpay/api/user').success(function(data, status, headers, config) {
            $scope.user = data.user;
            $scope.cards = data.cards;
        console.log(data);
            //console.log('successcurrentuser');
        }).error(function(data, status) { 
            //$scope.errors = data.errors;

        });

        console.log('addcardcontroller');

        $scope.addcard = function(){

        $http.post('http://localhost/quickpay/api/addcard',{
            'user_id':$scope.user.id,
            'name': $scope.name,
            'accno': $scope.number,
            'viewaccno': $scope.viewaccno,
            'cvv': $scope.cvc,
            'expdate':$scope.expiry,

        }
        
        ).success(function(data, status, headers, config) {

            $scope.thiscard = null;
            $scope.cards = data.card;
            console.log(data);

        }).error(function(data, status) { 
        //$scope.errors = data.errors;

        });
    }

})


.controller('FeedbackCtrl', function( $scope, $http, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion ) {

        $http.get('http://localhost/quickpay/api/user').success(function(data, status, headers, config) {
            $scope.user = data.user;
            $scope.cards = data.cards;
        console.log(data);
            //console.log('successcurrentuser');
        }).error(function(data, status) { 
            //$scope.errors = data.errors;

        });

        console.log('addcardcontroller');

        $scope.addcard = function(){
        //http://localhost/quickpay/api/card/1

        console.log($scope.myname);
        $http.post('http://localhost/quickpay/api/addcard',{
            'user_id':$scope.user.id,
            'name': $scope.name,
            'accno': $scope.accno,
            'viewaccno': $scope.viewaccno,
            'cvv': $scope.cvv,
            'expdate':$scope.expdate,

        }
        
        ).success(function(data, status, headers, config) {

            $scope.thiscard = null;
            $scope.cards = data.card;
            console.log(data);
        //console.log('successcurrentuser');
        }).error(function(data, status) { 
        //$scope.errors = data.errors;

        });
    }

})

.controller('PaymentcustomCtrl', function( $scope, $http, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion ) {

        //$http.get('http://localhost/quickpay/api/user').success(function(data, status, headers, config) {
        $http.get('http://localhost/quickpay/api/user').success(function(data, status, headers, config) {
            $scope.user = data.user;
            $scope.cards = data.cards;
        console.log(data);
            //console.log('successcurrentuser');
        }).error(function(data, status) { 
            //$scope.errors = data.errors;

        });

        console.log('addcardcontroller');

        $scope.addcard = function(){

        $http.post('http://localhost/quickpay/api/addcard',{
            'user_id':$scope.user.id,
            'name': $scope.name,
            'accno': $scope.accno,
            'viewaccno': $scope.viewaccno,
            'cvv': $scope.cvv,
            'expdate':$scope.expdate,

        }
        
        ).success(function(data, status, headers, config) {

            $scope.thiscard = null;
            $scope.cards = data.card;
            console.log(data);
        //console.log('successcurrentuser');
        }).error(function(data, status) { 
        //$scope.errors = data.errors;

        });
    }

})

.controller('PaymentbillCtrl', function( $scope, $http, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion ) {

        $http.get('http://localhost/quickpay/api/user').success(function(data, status, headers, config) {
            $scope.user = data.user;
            $scope.merchants = data.merchants;
            $scope.cards = data.cards;
        console.log(data);
            //console.log('successcurrentuser');
        }).error(function(data, status) { 
            //$scope.errors = data.errors;

        });

        $scope.paymerchantid = function(id){
            console.log(id);
            $scope.merchantid = id;
            
        }
        $scope.paymerchantnoid = function(){
            $scope.merchantid = '';
            $scope.cardid = '';
            $scope.paymentresponse = '';
            $scope.paymentdetails = {};
        }
        $scope.selectcard = function(id){
            $scope.cardid = id;
        }

        $scope.selectnocard = function(){
            $scope.cardid = '';
        }

        $scope.merchantid = '';
        $scope.cardid = '';
        $scope.paymentdetails = {};
        
        $scope.makebillpayment = function(){


           $http.post('http://localhost/quickpay/makebillpayment',{
            'user_id':$scope.user.id,
            'merchantid': $scope.merchantid,
            'cardid': $scope.cardid,
            'accno': $scope.paymentdetails.accno,
            'amount': $scope.paymentdetails.amount,
            }).success(function(data, status, headers, config) {
                console.log(data.merchant.name);
                $scope.merchantname = data.merchant.name;
                $scope.transaction_number = data.transaction_number;
                $scope.thistime = data.thistime;

            $scope.paymentresponse = "Transaction is being processed, please wait for status of transaction";
var request  = '{"card_type":"'+data.card.card_type+'","card_number":"'+data.card.accno+'","exp":"'+data.card.expdate+'","cvv":"'+data.card.cvv+'","amount":"'+data.amount+'","accno":"'+data.accno+'","merchant":"'+data.merchant.name+'"}';
                console.log(request);
                ////send data to migs /////
                $http.post('http://162.250.121.226/quick/process.asmx/Complete',{
                    'request': request
                    }).success(function(data, status, headers, config) {


                        //if (status == "00"){
                            $scope.paymentresponse = "Transaction status : Successful";
                            var notifyclient  = '{"msisdn":"'+$scope.user.mobile+'","sms":"Payment to '+$scope.merchantname+' is successful, Transaction Number:'+$scope.transaction_number+' on '+ $scope.thistime +'."}';
                            //var notifymerchant  = '{"msisdn":"'+data.card.card_type+'","sms":"'+data.card.accno+'"}';
                            ////send sms to client /////
                            $http.post('http://162.250.121.226/quick/process.asmx/Notify',{
                            'request': notifyclient
                            }).success(function(data, status, headers, config) {
                                console.log('success');
                            }).error(function(data, status) { 
                                console.log('failed');
                            });

                    }).error(function(data, status) { 
                        console.log('failed');
                    });

            }).error(function(data, status) { 
    
                console.log('failed');
            });

        }

        $scope.addcard = function(){

        $http.post('http://localhost/quickpay/api/addcard',{
            'user_id':$scope.user.id,
            'name': $scope.name,
            'accno': $scope.accno,
            'viewaccno': $scope.viewaccno,
            'cvv': $scope.cvv,
            'expdate':$scope.expdate,

        }
        
        ).success(function(data, status, headers, config) {

            $scope.thiscard = null;
            $scope.cards = data.card;
            console.log(data);
        //console.log('successcurrentuser');
        }).error(function(data, status) { 
        //$scope.errors = data.errors;

        });
    }

    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(false);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();

})
;



