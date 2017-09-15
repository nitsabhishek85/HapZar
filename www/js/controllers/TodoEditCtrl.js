app.controller('TodoEditCtrl', function ($scope,$rootScope,$state,$location, $stateParams, ionicMaterialInk,userService,$ionicPopup,$ionicLoading,myAuth) {
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

	  

		$scope.addtodouserlist = function() {
      $ionicLoading.show({
        template: 'Loading...'
      });      
      userService.getAcceptUserList($stateParams.id).then(
        function (data) {        
          	$scope.todouserlist = data.userList; 
            //$scope.todo.to_id = $scope.todouserlist[0].id;           
          	$ionicLoading.hide();          
        },
      function (errorMessage) {
      	$scope.todouserlist = [];
        $ionicLoading.hide();       
          
      });
      
    }
    //$scope.addtodouserlist();
    $scope.todo = {};
    $scope.todoDetail = function() {
      $ionicLoading.show({
        template: 'Loading...'
      });      
      userService.todoDetails($stateParams.tid).then(
        function (data) {        
            $scope.tododetails = data.TodoDetails; 
            $scope.todo.name = $scope.tododetails.name;
            $scope.todo.priority = $scope.tododetails.priority;
            if($scope.tododetails.expire_date != ''){
              $scope.todo.expire_date = new Date($scope.tododetails.expire_date);
            }else{
              $scope.todo.expire_date = '';
            }
            
            console.log($scope.tododetails.expire_date);
            console.log($scope.todo);
            //$scope.todo.to_id = $scope.todouserlist[0].id;           
            $ionicLoading.hide();          
        },
      function (errorMessage) {
        //$scope.tododetails = [];
        $scope.todo.name = '';
        $scope.todo.priority = '';
        $scope.todo.expire_date = '';
        $ionicLoading.hide();       
          
      });      
    }
    $scope.todoDetail();
    $scope.saveTodo = function(tododata) {
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
    	$scope.todo.id = $stateParams.tid;
      //console.log($scope.todo);
      //return false;
    	//$scope.todo.prj_id = $stateParams.id;
    	//$scope.todo.is_owner = 1;
		$ionicLoading.show({
	        template: 'Loading...'
	      });
	      userService.updateTodo(tododata).then(
	        function (data) {
        		//$location.path('/home_details/'+$stateParams.id);
            
	          $ionicLoading.hide();	 
            var alertPopup = $ionicPopup.alert({
              title: 'ToDo',
              template: 'Updated successfully'
            });         
	        },
	      function (errorMessage) {	      	
	        $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'ToDo',
            template: errorMessage
          });
	      });
    }

    
    $scope.cancelTodo = function() {
    	$location.path('/home_details/'+$stateParams.id);
    }   
	
    
});