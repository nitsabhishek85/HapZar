app.controller('ProjectEditCtrl', function ($scope,$rootScope,$location, $stateParams, ionicMaterialInk,userService,$ionicPopup,$ionicLoading,myAuth) {
    //ionic.material.ink.displayEffect();
    ionicMaterialInk.displayEffect();

    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
	  $scope.loggedindetails = myAuth.getUserNavlinks();
	  if($scope.loggedindetails){
	        
	  }else{
      $location.path('/');
    }
    $scope.projectId = $stateParams.id;
    $scope.projectInfo = [];
    $scope.projectDetail = function() {
      $ionicLoading.show({
        template: 'Loading...'
      });
      userService.getProjectDetail($stateParams.id).then(
        function (data) {          
          $scope.projectInfo = data.PrjList;  
          console.log($scope.projectInfo);      
          $ionicLoading.hide();
        },
      function (errorMessage) {
        $ionicLoading.hide();
        $scope.projectInfo = [];
        var alertPopup = $ionicPopup.alert({
          title: 'Project',
          template: 'No project found'
        });      
    });
    }
    $scope.projectDetail();
    $scope.project_close = '';

    $scope.projectGroupUserList = [];
    $scope.groupUserList = function() {
      $ionicLoading.show({
        template: 'Loading...'
      });
      userService.getProjectGroupUserList($stateParams.id).then(
        function (data) {          
          $scope.projectGroupUserList = data.projectGroupUserDetail;
          //$scope.project_close = data.all_complete;  
          //console.log($scope.todolist);      
          $ionicLoading.hide();
        },
      function (errorMessage) {
        $ionicLoading.hide();
        $scope.projectGroupUserList = [];
        //console.log(11);
          
      });
    }
    $scope.groupUserList();
    
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
          $scope.projectDetail();
          $scope.todoList();
          
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
            $scope.todoList();
          },
        function (errorMessage) {
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'To Do Complete',
            template: errorMessage
          }); 
          $scope.todoList();
        }); 
      }
      //console.log(tododata);
    }
    $scope.deleteProjectUserGroup = function(id,is_group) {
      if(is_group == 1){
        var confirmPopup = $ionicPopup.confirm({
          title: 'Want to delete ?',
          template: 'Are you sure you want to delete this Group?'
        });
      }else{
        var confirmPopup = $ionicPopup.confirm({
          title: 'Want to delete ?',
          template: 'Are you sure you want to delete this User?'
        });
      }
           
    confirmPopup.then(function(res) {
      if(res){
        $ionicLoading.show({
        template: 'Loading...'
      });
        userService.delProjectUserGroup(id,is_group,$stateParams.id).then(
          function (data) {          
            //$scope.todolist = data.TodoList;  
            //console.log($scope.todolist);      
            $ionicLoading.hide();
            $scope.groupUserList();
          },
        function (errorMessage) {
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Project',
            template: errorMessage
          }); 
          $scope.groupUserList();
        });
      }
      })
        
    }
    $scope.deleteProject = function() {
      var confirmPopup = $ionicPopup.confirm({
          title: 'Want to delete ?',
          template: 'Are you sure you want to delete this Project?'
        });
      confirmPopup.then(function(res) {
      if(res){
        $ionicLoading.show({
        template: 'Loading...'
      });

        userService.projectDelete($stateParams.id).then(
          function (data) {          
            //$scope.todolist = data.TodoList;  
            //console.log($scope.todolist);      
            $ionicLoading.hide();
            //$scope.groupUserList();
            $location.path('/home');
          },
        function (errorMessage) {
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Project',
            template: errorMessage
          }); 
          //$scope.groupUserList();
        });

      }
    });
    }

    $scope.editProject = function(prj_name) {
      $location.path('/update_project/'+$stateParams.id+'/'+prj_name);
    }
    
    
});