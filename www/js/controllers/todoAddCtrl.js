app.controller('todoAddCtrl', function ($scope,$rootScope,$state,$location, $stateParams, ionicMaterialInk,userService,$ionicPopup,$ionicLoading,myAuth) {
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
			to_id       	:'',
			expire_date  	:'',			
			priority     	:1,
			description     :''
		};

    $scope.addtodouserlist = function() {
      $ionicLoading.show({
        template: 'Loading...'
      });      
      userService.getAcceptUserList($stateParams.id).then(
        function (data) {        
          	$scope.todouserlist = data.userList; 
            $scope.todo.to_id = $scope.todouserlist[0].id;           
          	$ionicLoading.hide();          
        },
      function (errorMessage) {
      	$scope.todouserlist = [];
        $ionicLoading.hide();       
          
      });
        userService.getProjectDetail($stateParams.id).then(
            function (data) {          
              $scope.projectInfo = data.PrjList;
              //console.log($scope.projectInfo);
              //$ionicLoading.hide();
            },
        function (errorMessage) {
            //$ionicLoading.hide();
            $scope.projectInfo = [];

        });
    }
    $scope.addtodouserlist();
    $scope.saveTodo = function(tododata) {
      if($scope.todo.name == ''){
        var alertPopup = $ionicPopup.alert({
          title: 'ToDo',
          template: 'Please enter name'
        });
        return false;
      }
      if($scope.todo.to_id == ''){
        var alertPopup = $ionicPopup.alert({
          title: 'ToDo',
          template: 'Please select user'
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
    	$scope.todo.from_id = $scope.loggedindetails.id;
    	$scope.todo.prj_id = $stateParams.id;
    	$scope.todo.is_owner = 1;
		$ionicLoading.show({
	        template: 'Loading...'
	      });
	      userService.saveTodo(tododata).then(
	        function (data) {
                    if($scope.projectInfo.is_video_link==1){
                        $location.path('/video_home_details/'+$stateParams.id);
                    }else{
                        $location.path('/home_details/'+$stateParams.id);
                    }
        		//$location.path('/home_details/'+$stateParams.id);
        
	          $ionicLoading.hide();	          
	        },
	      function (errorMessage) {	      	
	        $ionicLoading.hide();
	      });
    }
    
    $scope.saveVideoTodo = function(tododata) {
        if($scope.todo.name == ''){
          var alertPopup = $ionicPopup.alert({
            title: 'ToDo',
            template: 'Please enter todo / task name'
          });
          return false;
        }
        $scope.todo.to_id = 0;
    	$scope.todo.from_id = $scope.loggedindetails.id;
    	$scope.todo.prj_id = $stateParams.id;
    	$scope.todo.is_owner = 1;
        $ionicLoading.show({
            template: 'Loading...'
        });
        userService.saveVideoTodo(tododata).then(
            function (data) {
                if($scope.projectInfo.is_video_link==1){
                    $location.path('/video_home_details/'+$stateParams.id);
                }else{
                    $location.path('/home_details/'+$stateParams.id);
                }
                $ionicLoading.hide();	          
            },
        function (errorMessage) {	      	
            $ionicLoading.hide();
        });
    }
    
    $scope.cancelTodo = function() {
        if($scope.projectInfo.is_video_link==1){
            $location.path('/video_home_details/'+$stateParams.id);
        }else{
            $location.path('/home_details/'+$stateParams.id);
        }
    }   
    
    $scope.DecreseItem = function() {
        $scope.CurPriority=$scope.todo.priority;
        //console.log($scope.CurPriority);
        if($scope.CurPriority==1 || $scope.CurPriority==''){
            $scope.todo.priority=1;
        }else{
            $scope.todo.priority= parseFloat($scope.CurPriority) - 1;
        }
    } 
    
    $scope.IncreseItem = function() {
        $scope.CurPriority=$scope.todo.priority;
        $scope.todo.priority= parseFloat($scope.CurPriority) + 1;
    }  
});