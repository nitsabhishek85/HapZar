app.controller('SignupCtrl', function ($scope,$rootScope,$location, $stateParams, ionicMaterialInk,userService,$ionicPopup,$ionicLoading,myAuth) {
    //ionic.material.ink.displayEffect();
    ionicMaterialInk.displayEffect();

    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
	  $scope.loggedindetails = myAuth.getUserNavlinks();
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
    $scope.user={
        name:'',
        email:'',
        password:'',
        mobile_number:'',
        location:''
    };
    $scope.userSignup = function(data) {

    	//console.log(data);
    	//return false;
      if(data.name == ''){
        var alertPopup = $ionicPopup.alert({
              title: 'Name',
              template: 'Please enter name'
            });
        return false;
      }
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
      data.device_type='';
      data.device_token_id='';
      data.lat='';
      data.lang='';
      $ionicLoading.show({
      template: 'Loading...'
    });

      userService.userSignup(data).then(
        function (data) {
          console.log(data);
          $scope.user={};
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'You have successfully registered please confirm by checking your email',
            template: 'Check your mail'
          });
          $location.path('/');
        },
        function (errorMessage) {
            $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: errorMessage,
            template: 'Please try again'
          });
        });
    };

    $scope.userLogin = function() {
      $location.path('/')
  }
    
});