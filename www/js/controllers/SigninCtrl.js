app.controller('SigninCtrl', function ($scope,$rootScope, $stateParams,$location,$q,ionicMaterialInk,$timeout,$ionicPopup,myAuth,$ionicLoading,userService) {
    //ionic.material.ink.displayEffect();
    ionicMaterialInk.displayEffect();
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
  $scope.loggedindetails = myAuth.getUserNavlinks();

  $scope.forgotpassword={
    email:''
  };

  if($scope.loggedindetails){
        $location.path('/home');
  }

    // Toggle Code Wrapper
    var code = document.getElementsByClassName('code-wrapper');
    for (var i = 0; i < code.length; i++) {
        code[i].addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }
    $scope.showPopup = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Wrong User name or password',
            template: 'Please check or create an account'
        });

        
    };

    $scope.user={
      email:'',
      password:''
    };

    $scope.forgotPassword = function(data) {
    $ionicLoading.show({
      template: 'Loading...'
    });
    //console.log(data.email);
    userService.userforgotpassword(data).then(
      function (data) {

        $scope.forgotpassword={
          email:''
        };
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
          title: 'Forgot Password',
          template: data.msg
        });
        //$state.go('',{},{reload:true});
        $location.path('/');

      },
      function (errorMessage) {
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
          title: 'Forgot Password',
          template: errorMessage
        });
      });
    //$ionicLoading.hide();

  }

    $scope.check_login = function(data) {
      console.log($rootScope.uuid);
      //return false;

      if(data.email == ''){
        var alertPopup = $ionicPopup.alert({
              title: 'Email',
              template: 'Please enter email'
            });
        return false;
      }
      if(data.password == ''){
        var alertPopup = $ionicPopup.alert({
              title: 'Password',
              template: 'Please enter password'
            });
        return false;
      }
    
        $ionicLoading.show({
          template: 'Loading...'
        });
        //data.device_type=$rootScope.deviceType;
        //data.device_token_id=$rootScope.uuid;

        data.device_type=$rootScope.deviceType;
        data.device_token_id=$rootScope.uuid;
        userService.userLogin(data).then(
          function (data) {
            console.log(data.UserDetails);
            localStorage.setItem('users', JSON.stringify(data.UserDetails));
            //$cookieStore.put('users', data.UserDetails);

            myAuth.updateUserinfo(myAuth.getUserAuthorisation());
            $scope.loggedindetails = myAuth.getUserNavlinks();
            $rootScope.loggedindetailss = myAuth.getUserNavlinks();
            console.log($scope.loggedindetails);
            $scope.user={};
            $ionicLoading.hide();
            $location.path('/home');
            //$state.go('user.my-storelist',{},{reload:true});
            
            

          },
          function (errorMessage) {
              $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'Login error',
              template: errorMessage
            });
          });
  };

  $scope.userSignup = function() {
      $location.path('/register')
  }
    
    
   /*  $scope.showPopup1 = function() {
     	
     	
     	 var customTemplate =
      '<ion-toggle>enable</ion-toggle>' +
      '<label class="item item-input"><input type="text" placeholder="your address"></label>';
      
        var alertPopup = $ionicPopup.alert({
            title: 'Wrong User ',
                 template: customTemplate,
            subTitle: 'select this option if GPS is unavailable',
      
        });

        
    };
   
   $scope.showPopup1();*/

   var fbLoginSuccess = function(response) {
    console.log(3);
    if (!response.authResponse){
      fbLoginError("Cannot find the authResponse");
      return;
    }

    var authResponse = response.authResponse;

    getFacebookProfileInfo(authResponse)
    .then(function(profileInfo) {
        $scope.fbSubmitWithEmail(profileInfo);

    }, function(fail){
      // Fail get profile info
      //console.log('profile info fail', fail);
      var alertPopup = $ionicPopup.alert({
            title: 'Login failed!',
            template: 'Please try again'
          });
    });
  };

  $scope.fbSubmitWithEmail = function(profileInfo){
    console.log(profileInfo);
       /*userService.fblogin(profileInfo).then(function(authenticated) {
                if(authenticated.ack==1)
                {
                    $scope.setCurrentSession(AuthService.getUserInfo()); 
                    $state.go('user.home', {}, {reload: true});
                    
                    $scope.need_email = false;
                }
                
                
                $ionicLoading.hide();
            });*/
            profileInfo.device_type='android';
            profileInfo.device_token_id='66754gg75fht56';
            userService.fblogin(profileInfo).then(
              function (data) {
                console.log(data);
                //return false;
                console.log(data.UserDetails);
            localStorage.setItem('users', JSON.stringify(data.UserDetails));
            //$cookieStore.put('users', data.UserDetails);

            myAuth.updateUserinfo(myAuth.getUserAuthorisation());
            $scope.loggedindetails = myAuth.getUserNavlinks();
            $rootScope.loggedindetailss = myAuth.getUserNavlinks();
            console.log($scope.loggedindetails);
            $scope.user={};
            $ionicLoading.hide();
            $location.path('/home');

              },
              function (errorMessage) {
                  $ionicLoading.hide();
                  var alertPopup = $ionicPopup.alert({
                    title: 'Login failed!',
                    template: errorMessage
                  });
              });
  }

  var fbLoginError = function(error){
    console.log('fbLoginError', error);
    $ionicLoading.hide();
  };

  // This method is to get the user profile info from the facebook api
  var getFacebookProfileInfo = function (authResponse) {
    var info = $q.defer();

    facebookConnectPlugin.api('/me?fields=email,first_name,last_name,gender,picture&access_token=' + authResponse.accessToken, ["public_profile"],
      function (response) {
                console.log(response);
        info.resolve(response);
      },
      function (response) {
                console.log(response);
        info.reject(response);
      }
    );
    return info.promise;
  };

    $scope.facebookSignIn = function() {
      console.log(1);
        facebookConnectPlugin.getLoginStatus(function(success){
          console.log(2);

                    // Ask the permissions you need. You can learn more about
                    // FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
            facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
          
        });
      };
      
      $scope.flogout = function(){
          facebookConnectPlugin.logout(function(){
              alert('hi');
          });
  }



});