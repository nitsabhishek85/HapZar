app.controller('UserProfileCtrl', function ($scope,$rootScope,$location, $stateParams, ionicMaterialInk,userService,$ionicPopup,$ionicLoading,myAuth,storeService) {
    //ionic.material.ink.displayEffect();
    ionicMaterialInk.displayEffect();

    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
	  $scope.loggedindetails = myAuth.getUserNavlinks();
	  
  	$scope.user={};
  	$scope.getUserById = function() {
    $ionicLoading.show({
      template: 'Loading...'
    });
    userService.getUserInfo($scope.loggedindetails.id).then(
        function (data) {
          console.log(data);
          //return false;
          $scope.userinfo = data.UserDetails;


          $scope.user = {
            name            :$scope.userinfo[0].name,
            mobile_number        :$scope.userinfo[0].mobile_number,
            email           :$scope.userinfo[0].email,
            location  :$scope.userinfo[0].location,
            profile_image  :''


          };
          $scope.profile_image_url =$scope.userinfo[0].profile_image_url;
          $rootScope.profile_image_urll =$scope.userinfo[0].profile_image_url;
          $ionicLoading.hide();

        },
        function (errorMessage) {

        });
    /*$scope.user = {
      first_name            :'',
      last_name        :'',
      email           :'',
      phone  :'',

    };*/

  }
  $scope.getUserById();

  $scope.userSave = function (userdetails) {
      $ionicLoading.show({
      template: 'Loading...'
    });
      $scope.uname = userdetails.name;
      if(userdetails.name != ''){
      	var uname = userdetails.name.split(' ');
      	userdetails.first_name = uname[0];
      	userdetails.last_name = uname[1];
      }else{
  			userdetails.first_name = '';
      		userdetails.last_name = '';
      }
    userdetails.id=$scope.loggedindetails.id;

    console.log(userdetails);
    //return false;
    storeService.userEdit(userdetails).then(
      function (data) {
        //console.log(data);
        $ionicLoading.hide();
        $scope.getUserById();
        var alertPopup = $ionicPopup.alert({
          title: 'Successfully Saved',
          template: 'Successfully Saved'
        });
        //$location.path('/storepage/'+$stateParams.store_id);

      },
      function (errorMessage) {
          $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
          title: errorMessage,
          template: 'Please try again'
        });
      });
  };
    
    
});