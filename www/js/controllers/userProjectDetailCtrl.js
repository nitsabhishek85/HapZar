app.controller('userProjectDetailCtrl', function ($scope,$rootScope,$location, $stateParams, ionicMaterialInk,userService,$ionicPopup,$ionicLoading,myAuth,$sce,$timeout) {
    //ionic.material.ink.displayEffect();
    ionicMaterialInk.displayEffect();

    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
	  $scope.loggedindetails = myAuth.getUserNavlinks();
	  if($scope.loggedindetails){
	        
	  }else{
      $location.path('/');
    }
    $scope.projectInfo = [];
    $scope.videoEmbLinkData='';
    $scope.projectDetail = function() {
      $ionicLoading.show({
        template: 'Loading...'
      });
      userService.getProjectDetail($stateParams.id).then(
        function (data) {          
          $scope.projectInfo = data.PrjList;  
          //console.log($scope.projectInfo); 
          if($scope.projectInfo.is_video_link == 1){
              $scope.videoEmbLinkData=$sce.trustAsHtml($scope.projectInfo.embed_video);
          }      
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

    $scope.todoList = function() {
      $ionicLoading.show({
        template: 'Loading...'
      });
        if($scope.projectInfo.is_video_link == 1){
            userService.getvideotodoList($stateParams.id).then(
              function (data) {          
                $scope.todolist = data.TodoList; 
                $scope.project_close = data.all_complete;  
                angular.forEach($scope.todolist, function (itemval) {
                    if (itemval.to_id == 0) {
                        itemval.IsVisible = false;                
                    }else{
                        //itemval.favourite = false; 
                        itemval.IsVisible = false;
                    }
                });  
            
                $ionicLoading.hide();
              },
            function (errorMessage) {
              $ionicLoading.hide();
              $scope.todolist = [];
              //console.log(11);

            });
        }else{
            userService.getusertodoList($scope.loggedindetails.id,$stateParams.id).then(
              function (data) {          
                $scope.todolist = data.TodoList;  
                $scope.project_close = data.all_complete;  
                //console.log($scope.todolist);      
                $ionicLoading.hide();
              },
            function (errorMessage) {
              $ionicLoading.hide();
              $scope.todolist = [];
              //console.log(11);

            });
        }
    }
    $scope.todoList();
    $timeout($scope.todoList, 500);
    
    $scope.addTask = function() {
      //alert('/user_add_todo/'+$stateParams.id+'/'+$stateParams.user_id);
      $location.path('/user_add_todo/'+$stateParams.id+'/'+$stateParams.user_id);
      /*userService.getAcceptUserList($stateParams.id).then(
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

    $scope.todo_details = function(tid) {
      $location.path('/to_do_detail/'+tid);
    }
    
    $scope.video_todo_details = function(tid) {
      $location.path('/video_todo_detail/'+tid);
    }
    
    $scope.todoChat = function() {
        $location.path('/todo_videochat/'+$stateParams.id);
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

    $scope.projectEdit = function() {
      $location.path('/project-edit/'+$stateParams.id);
    }
    
    $scope.user_available_div = function(todo_data) {
        angular.forEach($scope.todolist, function (itemval) {
            if (itemval.to_id == 0) {
                itemval.IsVisible = false;                
            }else{
                //itemval.favourite = false; 
                itemval.IsVisible = false;
            }
        });
        //console.log(todo_data);
        if(todo_data.IsVisible){
            todo_data.IsVisible = false;
        }else{
            todo_data.IsVisible = true;
        }
        //$scope.todo_data.IsVisible = $scope.todo_data.IsVisible ? false : true;
    } 
    
    $scope.confirm_todo = function(con_tododata) {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Want to confirm?',
            template: 'Are you sure you want to confirm this todo?'
        });
        confirmPopup.then(function(res) {
            if(res){
                if (con_tododata.to_id != $scope.loggedindetails.id) {
                    $ionicLoading.show({
                        template: 'Loading...'
                    });

                    userService.todoVideoStatusSave($scope.loggedindetails.id,con_tododata.id).then(
                        function (data) {          
                            $ionicLoading.hide();
                            $scope.todoList();
                        },
                        function (errorMessage) {
                            $ionicLoading.hide();
                            var alertPopup = $ionicPopup.alert({
                              title: 'Error!',
                              template: errorMessage
                            }); 
                            $scope.todoList();
                        });
                }else{
                    var alertPopup = $ionicPopup.alert({
                        title: 'Alert!',
                        template: 'You have already confirm this todo.'
                    });
                }
            }
        });
        
    }
    
    $scope.delete_todo = function(con_tododata) {    
        var confirmPopup = $ionicPopup.confirm({
            title: 'Want to reject?',
            template: 'Are you sure you want to reject this todo?'
        });
        
        confirmPopup.then(function(res) {
            if(res){
                if (con_tododata.to_id == $scope.loggedindetails.id) {
                    $ionicLoading.show({
                        template: 'Loading...'
                    });

                    userService.todoDeleteVideoStatus($scope.loggedindetails.id,con_tododata.id).then(
                        function (data) {          
                            $ionicLoading.hide();
                            $scope.todoList();
                        },
                        function (errorMessage) {
                            $ionicLoading.hide();
                            var alertPopup = $ionicPopup.alert({
                              title: 'Error!',
                              template: errorMessage
                            }); 
                            $scope.todoList();
                        });
                }else{
                    var alertPopup = $ionicPopup.alert({
                        title: 'Alert!',
                        template: 'You can not reject this todo.'
                    });
                }
            }
        });
    }
    
});