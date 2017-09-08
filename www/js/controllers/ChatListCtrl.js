app.controller('ChatListCtrl', function ($scope,$rootScope,$location, $stateParams, ionicMaterialInk,userService,$ionicPopup,$ionicLoading,myAuth) {
    //ionic.material.ink.displayEffect();
    ionicMaterialInk.displayEffect();
    $scope.projectInfo = [];

    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
  	$scope.loggedindetails = myAuth.getUserNavlinks();
	  
	  if($scope.loggedindetails){
	  	
	  }else{
	  	$location.path('/');
	  }
	  $scope.userData = [];

	  $scope.otherUserList = function () {
	  	//alert(1);
	  	$ionicLoading.show({
	      template: 'Loading...'
	    });
	    userService.getOtherUserList($scope.loggedindetails.id).then(
	      function (data) {
	        
	        $scope.userData = data.userList;
	        //console.log($scope.userData);
	        $ionicLoading.hide();
	        
	        //alert($scope.storecategory);

      	},
		function (errorMessage) {
			$ionicLoading.hide();
			$scope.userData = [];
			
		});
  	};
  	$scope.otherUserList();
  	
  	$scope.chatDetail = function (u_id) {
  		//alert(p_id);
  		$location.path('/chat/'+u_id);

  	}
    
    
});