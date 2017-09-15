app.controller('ProjectListingCtrl', function ($scope,$rootScope,$location, $stateParams, ionicMaterialInk,$timeout,userService,$ionicPopup,$ionicLoading,myAuth) {
    //ionic.material.ink.displayEffect();
    ionicMaterialInk.displayEffect();
    $scope.projectInfo = [];

    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
  	$scope.loggedindetails = myAuth.getUserNavlinks();
	  
	  if($scope.loggedindetails){
	  	
	  }else{
	  	$location.path('/');
	  }
	  $scope.projectInfo = [];
	  var clikcs = 0;
	  var timer= null;
    //$scope.projectfilter ={type:1};

	  
	  
  	$scope.indclk = function(project) {			
	  			
  		clikcs++;	  		
  		if(clikcs === 1) {
  			timer = $timeout(function() {				  
			   clikcs = 0;
         if(project.user_id == $scope.loggedindetails.id){
             if(project.is_video_link==1){
  		$location.path('/video_home_details/'+project.id);
            }else{
                $location.path('/home_details/'+project.id);
            }
            
         }else {
            if(project.isaccepted == 1){
                if(project.is_video_link==1){
                    $location.path('/user_videoproject_details/'+project.id+'/'+project.user_id);
                }else{
                    $location.path('/user_project_details/'+project.id+'/'+project.user_id);
                }
            }else{
                $location.path('/alert_info/'+project.notification_id+'/'+project.id+'/'+project.user_id);
            }
         }
			   
			}, 700);
  		}else{
  			$timeout.cancel(timer);	  			
  			clikcs = 0;
  			$location.path('/groupchat/'+project.id);
  			//$location.path('/chatlist');
  		}          
    }
    $scope.populateProject = function(optiontype) {
      $rootScope.projectfilter.type = optiontype;
      $scope.IsVisible = $scope.IsVisible ? false : true;
      if(optiontype == 1){
        $ionicLoading.show({
          template: 'Loading...'
        });
      userService.getProjectList($scope.loggedindetails.id).then(
          function (data) {
            
            $scope.projectInfo = data.PrjList;
            //console.log($scope.projectInfo);
            $ionicLoading.hide();
            
            //alert($scope.storecategory);

          },
      function (errorMessage) {
        $ionicLoading.hide();
        $scope.projectInfo = [];
        
      });

      }else if(optiontype == 2){

        $ionicLoading.show({
          template: 'Loading...'
        });
        userService.assignProjectList($scope.loggedindetails.id).then(
            function (data) {
              
              $scope.projectInfo = data.PrjList;
              //console.log($scope.projectInfo);
              $ionicLoading.hide();
              
              //alert($scope.storecategory);

            },
        function (errorMessage) {
          $ionicLoading.hide();
          $scope.projectInfo = [];
          
        });

      }else if(optiontype ==3){
        $ionicLoading.show({
          template: 'Loading...'
        });
        userService.allProjectList($scope.loggedindetails.id).then(
            function (data) {
              
              $scope.projectInfo = data.PrjList;
              //console.log($scope.projectInfo);
              $ionicLoading.hide();
              
              //alert($scope.storecategory);

            },
        function (errorMessage) {
          $ionicLoading.hide();
          $scope.projectInfo = [];
          
        });

      }
    }

    $scope.populateProject($rootScope.projectfilter.type);

	   $scope.singleClick = function() {
          alert('Single Click');
        }
        $scope.doubleClickk = function() {
          alert('Double Click');
        }

	  $scope.projectList = function () {
	  	//alert(1);
	  	$ionicLoading.show({
	      template: 'Loading...'
	    });
	    userService.getProjectList($scope.loggedindetails.id).then(
	      function (data) {
	        
	        $scope.projectInfo = data.PrjList;
	        //console.log($scope.projectInfo);
	        $ionicLoading.hide();
	        
	        //alert($scope.storecategory);

      	},
		function (errorMessage) {
			$ionicLoading.hide();
			$scope.projectInfo = [];
			
		});
  	};
  	//$scope.projectList();
  	
  	$scope.gotodetail = function (p_id,is_video) {
            if(is_video==1){
  		$location.path('/video_home_details/'+p_id);
            }else{
                $location.path('/home_details/'+p_id);
            }

  	}
  	$scope.gotoProjectChat = function (p_id) {		

  		$location.path('/groupchat/'+p_id);

  	}
  	//$scope.orderProperty = '';
  	$scope.setOrderProperty = function(propertyName) {
        if ($rootScope.orderProperty === propertyName) {
            $rootScope.orderProperty = '-' + propertyName;
        } else if ($rootScope.orderProperty === '-' + propertyName) {
            $rootScope.orderProperty = propertyName;
        } else {
            $rootScope.orderProperty = propertyName;
        }
    };

    $scope.IsVisible = false;
        $scope.ShowHide = function () {
            //If DIV is visible it will be hidden and vice versa.
            $scope.IsVisible = $scope.IsVisible ? false : true;
        }
  	
    
    
});