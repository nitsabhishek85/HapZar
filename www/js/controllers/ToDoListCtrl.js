app.controller('ToDoListCtrl', function ($scope,$rootScope,$location, $stateParams, ionicMaterialInk,userService,$ionicPopup,$ionicLoading,myAuth) {
    //ionic.material.ink.displayEffect();
    ionicMaterialInk.displayEffect();

    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
	  $scope.loggedindetails = myAuth.getUserNavlinks();
	  if($scope.loggedindetails){
	        
	  }else{
      $location.path('/');
    }
    //$scope.projectInfo = [];
    
    //$scope.project_close = '';

    $scope.populateToDo = function(optiontype) {
      $rootScope.todofilter.type = optiontype;
      $scope.IsVisible = $scope.IsVisible ? false : true;
      if(optiontype == 1){
        $ionicLoading.show({
          template: 'Loading...'
        });
      userService.getMyToDoList($scope.loggedindetails.id).then(
          function (data) {
            
            $scope.todolist = data.TodoList;
            //console.log($scope.projectInfo);
            $ionicLoading.hide();
            
            //alert($scope.storecategory);

          },
      function (errorMessage) {
        $ionicLoading.hide();
        $scope.todolist = [];
        
      });

      }else if(optiontype == 2){

        $ionicLoading.show({
          template: 'Loading...'
        });
        userService.getAssignToDoList($scope.loggedindetails.id).then(
            function (data) {
              
              $scope.todolist = data.TodoList;
              //console.log($scope.projectInfo);
              $ionicLoading.hide();
              
              //alert($scope.storecategory);

            },
        function (errorMessage) {
          $ionicLoading.hide();
          $scope.todolist = [];
          
        });

      }else if(optiontype ==3){
        $ionicLoading.show({
          template: 'Loading...'
        });
        userService.getAllToDoList($scope.loggedindetails.id).then(
            function (data) {
              
              $scope.todolist = data.TodoList;
              //console.log($scope.projectInfo);
              $ionicLoading.hide();
              
              //alert($scope.storecategory);

            },
        function (errorMessage) {
          $ionicLoading.hide();
          $scope.todolist = [];
          
        });

      }else if(optiontype ==4){
        $ionicLoading.show({
          template: 'Loading...'
        });
        userService.getCompletedToDoList($scope.loggedindetails.id).then(
            function (data) {
              
              $scope.todolist = data.TodoList;
              //console.log($scope.projectInfo);
              $ionicLoading.hide();
              
              //alert($scope.storecategory);

            },
        function (errorMessage) {
          $ionicLoading.hide();
          $scope.todolist = [];
          
        });

      }else if(optiontype ==5){
        $ionicLoading.show({
          template: 'Loading...'
        });
        userService.getUncompletedToDoList($scope.loggedindetails.id).then(
            function (data) {
              
              $scope.todolist = data.TodoList;
              //console.log($scope.projectInfo);
              $ionicLoading.hide();
              
              //alert($scope.storecategory);

            },
        function (errorMessage) {
          $ionicLoading.hide();
          $scope.todolist = [];
          
        });

      }
    }

    $scope.populateToDo($rootScope.todofilter.type);

    /*$scope.todoList = function() {
      $ionicLoading.show({
        template: 'Loading...'
      });
      userService.gettodoList($scope.loggedindetails.id,$stateParams.id).then(
        function (data) {          
          $scope.todolist = data.TodoList; 
          $scope.project_close = data.all_complete;  
          console.log($scope.todolist);      
          $ionicLoading.hide();
        },
      function (errorMessage) {
        $ionicLoading.hide();
        $scope.todolist = [];
        //console.log(11);
          
      });
    }*/
    //$scope.todoList();
    
    $scope.addTask = function() {
      $location.path('/add_details/'+$stateParams.id);
      /*$ionicLoading.show({
        template: 'Loading...'
      });
      userService.getAcceptUserList($stateParams.id).then(
        function (data) {        
              
          $ionicLoading.hide();
          $location.path('/add_details/'+$stateParams.id);
        },
      function (errorMessage) {
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
          title: 'Add To Do',
          template: 'You can not add ToDo because till now nobody accept your request for this project'
        }); 
        //console.log(11);
          
      });*/
      
    }

    $scope.projectClose = function(p_id) {
      $ionicLoading.show({
        template: 'Loading...'
      });
      userService.closeProject(p_id,$scope.loggedindetails.id).then(
        function (data) {        
              
          $ionicLoading.hide();
          //$scope.projectDetail();
          $scope.populateToDo($rootScope.todofilter.type);
          
        },
      function (errorMessage) {
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
          title: 'Project',
          template: 'Error occured, please try again.'
        });
      });      
    }

    $scope.todo_details = function(tid) {
      $location.path('/to_do_detail/'+tid);
    }

    $scope.todoCheckClick = function(tododata,todo_id) {      
      if (tododata.id == todo_id) {
        $ionicLoading.show({
          template: 'Loading...'
        });
        if(tododata.is_selected == 1){
          tododata.is_selected = 0;
          tododata.is_checked = false;
        }else{
          tododata.is_selected = 1;
          tododata.is_checked = true;
        }
        userService.todoStatusSave($scope.loggedindetails.id,todo_id,tododata.is_selected).then(
          function (data) {          
            //$scope.todolist = data.TodoList;  
            //console.log($scope.todolist);      
            $ionicLoading.hide();
            $scope.populateToDo($rootScope.todofilter.type);
          },
        function (errorMessage) {
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'To Do Complete',
            template: errorMessage
          }); 
          $scope.populateToDo($rootScope.todofilter.type);
        });
      }
      //console.log(tododata);
    }

    $scope.IsVisible = false;
        $scope.ShowHide = function () {
            //If DIV is visible it will be hidden and vice versa.
            $scope.IsVisible = $scope.IsVisible ? false : true;
        }
    
    
    
    
});