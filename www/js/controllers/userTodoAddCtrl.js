app.controller('userTodoAddCtrl', function ($scope,$rootScope,$state,$location, $stateParams, ionicMaterialInk,userService,$ionicPopup,$ionicLoading,myAuth) {
    //ionic.material.ink.displayEffect();
    //ionicMaterialInk.displayEffect();
    //alert('pROJECT mAN');
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
	  $scope.loggedindetails = myAuth.getUserNavlinks();
	  console.log($scope.loggedindetails.id);
	  if($scope.loggedindetails){
	  	
	  }else{
	  	$location.path('/');
	  }

	  $scope.todo = {
			name        	:'',			
			expire_date  	:'',			
			priority     	:'',
			description     :''
		};

    $scope.addtodouserlist = function() {
        $ionicLoading.show({
          template: 'Loading...'
        });      
        userService.getAcceptUserList($stateParams.id).then(
          function (data) {        
                  $scope.todouserlist = data.userList;              
                  $ionicLoading.hide();          
          },
        function (errorMessage) {
          $scope.todouserlist = [];
          $ionicLoading.hide();       
        });
        userService.getProjectDetail($stateParams.id).then(
            function (data) {          
              $scope.projectInfo = data.PrjList;  
              //$ionicLoading.hide();
            },
        function (errorMessage) {
            //$ionicLoading.hide();
            $scope.projectInfo = [];

        });
    }
    $scope.addtodouserlist();
    
    $scope.saveTodo = function(tododata) {
    	$scope.todo.from_id = $scope.loggedindetails.id;
    	$scope.todo.to_id = $stateParams.user_id;
    	$scope.todo.prj_id = $stateParams.id;
      if($scope.todo.name == ''){
        var alertPopup = $ionicPopup.alert({
          title: 'ToDo',
          template: 'Please enter name'
        });
        return false;
      }      
      /*if($scope.todo.expire_date == ''){
        var alertPopup = $ionicPopup.alert({
          title: 'ToDo',
          template: 'Please select date'
        });
        return false;
      }
      if($scope.todo.priority == ''){
        var alertPopup = $ionicPopup.alert({
          title: 'ToDo',
          template: 'Please enter priority'
        });
        return false;
      }*/
    	//$scope.todo.is_owner = 0;
		$ionicLoading.show({
	        template: 'Loading...'
	      });
      userService.checkProject($stateParams.id).then(
          function (data1) {
                if(data1.projectDetail.user_id == $scope.loggedindetails.id){
                    $scope.todo.is_owner = 1;
                }else{
                    $scope.todo.is_owner = 0;
                    $scope.todo.from_id = $stateParams.user_id;
                    $scope.todo.to_id = $scope.loggedindetails.id;
                }
                userService.saveTodo(tododata).then(
                  function (data) {
                    if($scope.projectInfo.is_video_link==1){
                        $location.path('/user_videoproject_details/'+$stateParams.id+'/'+$scope.loggedindetails.id);
                    }else{
                        $location.path('/user_project_details/'+$stateParams.id);
                    }
                      
                    $ionicLoading.hide();           
                  },
                function (errorMessage) {         
                  $ionicLoading.hide();
                });     
          },
        function (errorMessage) {         
          $ionicLoading.hide();
        });
	      
    }

    
    $scope.cancelTodo = function() {
        if($scope.projectInfo.is_video_link==1){
            $location.path('/user_videoproject_details/'+$stateParams.id+'/'+$scope.loggedindetails.id);
        }else{
            $location.path('/user_project_details/'+$stateParams.id);
        }
    	
    }   
	
    
});