app.controller('ProjectUpdateCtrl', function ($scope,$rootScope,$location, $stateParams, ionicMaterialInk,userService,$ionicPopup,$ionicLoading,myAuth) {
    //ionic.material.ink.displayEffect();
    ionicMaterialInk.displayEffect();

    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
	  $scope.loggedindetails = myAuth.getUserNavlinks();
	  if($scope.loggedindetails){
	        
	  }else{
      $location.path('/');
    }
    $scope.project ={};
    $scope.project.id = $stateParams.id;
    $scope.project.name = $stateParams.name;
    
           
    
    

    
    $scope.saveProject = function() {      
      $ionicLoading.show({
        template: 'Loading...'
      });
      userService.editProject($scope.project.name,$scope.project.id).then(
        function (data) {
             
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Project',
            template: 'Updated Successfully'
          });
          //$scope.favouriteList();

          $location.path('/project-edit/'+$stateParams.id);

        },
    function (errorMessage) {
      $ionicLoading.hide();
      var alertPopup = $ionicPopup.alert({
            title: 'Project',
            template: errorMessage
          });
      
           
    });
    }
    
    
});