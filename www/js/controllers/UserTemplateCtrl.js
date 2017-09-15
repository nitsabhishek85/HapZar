app.controller('UserTemplateCtrl', function ($scope,$rootScope,$state,$location, $stateParams,$ionicHistory, ionicMaterialInk,userService,$ionicPopup,$ionicLoading,myAuth) {
    
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
	  $scope.loggedindetails = myAuth.getUserNavlinks();	  
	  $scope.projectAdd = function() {	
      $rootScope.projectSelectUserGroup =[];
      $rootScope.projectSelectUser =[];
      $rootScope.projectSelectGroup =[]; 
      $rootScope.projectSelectUserName =[];
      $rootScope.projectSelectGroupName =[];
      $rootScope.projectGroupRelatedUserName =[];
      $rootScope.projectSelectedName = ''; 	
      $rootScope.project_name_for_add ='';
	  	$state.go('user.add_job');
	  }
    $scope.updateProfile = function() {      
      $state.go('user.details');
    }
    $scope.myGoBack = function() {      
      window.history.back();
    };	  

	  $scope.getUserById = function() {
    $ionicLoading.show({
      template: 'Loading...'
    });
    userService.getUserInfo($scope.loggedindetails.id).then(
        function (data) {
          console.log(data);
          $scope.userinfo = data.UserDetails;
          $rootScope.profile_image_urll =$scope.userinfo[0].profile_image_url;
          $scope.profile_name =$scope.userinfo[0].name;
          $ionicLoading.hide();
        },
        function (errorMessage) {
          
        });
  }

  $scope.geclicked = function() {
    console.log(11);
  }
  if($scope.loggedindetails){
    $scope.getUserById();
  } 
});