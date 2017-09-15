app.controller('userToDoDetailCtrl', function ($scope,$rootScope,$location, $stateParams, ionicMaterialInk,userService,$ionicPopup,$ionicLoading,myAuth) {
    //ionic.material.ink.displayEffect();
    ionicMaterialInk.displayEffect();

    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
	  $scope.loggedindetails = myAuth.getUserNavlinks();
	  if($scope.loggedindetails){
	        
	  }else{
      $location.path('/');
    }
    $scope.todoInfo = '';
    $scope.IsVisible = false;
    $scope.todo = {
        name        	:'',
        expire_date  	:'',			
        priority     	:1,
        description     :''
    };
                
    $scope.todoDetail = function() {
      $ionicLoading.show({
        template: 'Loading...'
      });
      userService.getToDoDetail($stateParams.id).then(
        function (data) {          
          $scope.todoInfo = data.TodoDetails;  
          //console.log($scope.todoInfo);      
          $ionicLoading.hide();
        },
      function (errorMessage) {
        $ionicLoading.hide();
        $scope.todoInfo = '';
        var alertPopup = $ionicPopup.alert({
          title: 'ToDo',
          template: 'No todo found'
        });      
    });
    }
    $scope.todoDetail();

    $scope.todoClose = function(todoid) {
      $ionicLoading.show({
        template: 'Loading...'
      });
      userService.closeToDo(todoid,$scope.loggedindetails.id).then(
        function (data) {          
          //$scope.todoInfo = data.TodoDetails;  
          //console.log($scope.projectInfo);      
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'ToDo',
            template: data.msg
          });
          $scope.todoDetail();
        },
      function (errorMessage) {
        $ionicLoading.hide();
        $scope.todoInfo = '';
        var alertPopup = $ionicPopup.alert({
          title: 'ToDo',
          template: 'No todo found'
        });      
    });

    }
    
    $scope.todoEdit = function(con_tododata) {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Edit Todo',
            template: 'Are you sure you want to edit this todo?'
        });
        confirmPopup.then(function(res) {
            if(res){
                if (con_tododata.from_id == $scope.loggedindetails.id) {
                    $ionicLoading.show({
                        template: 'Loading...'
                    });
                    $scope.expire_date_str = con_tododata.expire_date;
                    //$scope.splitData = $scope.expire_date_str.split(",");
                    //$scope.newDateStr = $scope.splitData[0]+','+$scope.splitData[1]+','+$scope.splitData[2];
                    //$scope.newDateStr = $scope.splitData[1]+'/'+$scope.splitData[2]+'/'+$scope.splitData[0];
                    //console.log(con_tododata);
                    $scope.todo.name = con_tododata.name;
                    $scope.todo.expire_date = con_tododata.expire_date;
                    $scope.todo.priority = parseInt(con_tododata.priority);
                    
                    $scope.IsVisible = true;
                    $ionicLoading.hide();
                }else{
                    var alertPopup = $ionicPopup.alert({
                        title: 'Alert!',
                        template: 'You can not edit this todo.'
                    });
                }
            }
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
        $scope.todo.id = $scope.todoInfo.id;
    	/*$scope.todo.from_id = $scope.loggedindetails.id;
    	$scope.todo.prj_id = $stateParams.id;
    	$scope.todo.is_owner = 1;*/
        $ionicLoading.show({
            template: 'Loading...'
        });
        userService.editVideoTodo(tododata).then(
            function (data) {
                $scope.todoDetail();
                $scope.IsVisible = false;
                $ionicLoading.hide();	          
            },
        function (errorMessage) {	      	
            $ionicLoading.hide();
        });
    }
    
    $scope.cancelTodo = function() {
        $scope.IsVisible = false;
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