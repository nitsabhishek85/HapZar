app.controller('ProjectManageCtrl', function ($scope,$rootScope,$state,$location, $stateParams, ionicMaterialInk,userService,$ionicPopup,$ionicLoading,myAuth,NgMap,$sce) {
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
	$scope.demoTime = new Date (new Date().toDateString() + ' ' + '10:45');
        $scope.show_video={};
        $scope.show_video.show_video_text = false;
	  $scope.project_share_with = [];
	$scope.project_additional_option = [];
	$scope.intProject = function() {
		//alert(11);
		$scope.project_share_with = [];
	$scope.project_additional_option = [];
		$scope.project = {
			name          		:$rootScope.project_name_for_add,
                        embed_video  :$rootScope.project_embed_vlink,
			project_count       :'',
			warehouse_location  :'',
			delivery_address  	:'',
			pickup_address     	:'',
			dropoff_address     :''
		};
		$scope.share_data={		
			user_id:''
		};
		$scope.project_share_with.push($scope.share_data);
	}
	//$scope.intProject();

	NgMap.getMap().then(function(map) {
	    $scope.map = map;
	  });

	  $scope.placeChanged = function() {
	    $scope.place = this.getPlace();
	    console.log($scope.place.geometry.location.lat());
	    $scope.store.lat=$scope.place.geometry.location.lat();
	    $scope.store.lang=$scope.place.geometry.location.lng();
	    //console.log('Lat:'+$scope.menuInfo.lat+" Lng:"+$scope.menuInfo.lng);
	    //$scope.map.setCenter($scope.place.geometry.location);
	  }

	  $scope.disableTap = function(){
	    container = document.getElementsByClassName('pac-container');
	    // disable ionic data tab
	    angular.element(container).attr('data-tap-disabled', 'true');
	    // leave input field if google-address-entry is selected
	    angular.element(container).on("click", function(){
	      document.getElementById('pac-input').blur();
	    });
	  };

	
	//alert($scope.project_additional_option.length);
	
	
    $scope.addShare = function() {
    	$scope.share_data={		
			user_id:''
		};
		$scope.project_share_with.push($scope.share_data);
    }
    $scope.addOption = function() {
    	$scope.option_data={		
			current_address:'',
			destination_address:'',
			start_time: '',
			end_time:'',
			projects_date:'',
			returning:'',
			notes:'',
		};
		$scope.project_additional_option.push($scope.option_data);
    }

    $scope.userList = function () {
	    userService.getuserList($scope.loggedindetails.id).then(
	      function (data) {
	        
	        $scope.userInfo = data.UserList;
	        console.log($scope.userInfo);
	        
	        //alert($scope.storecategory);

      	},
		function (errorMessage) {
			$scope.userInfo = [];
			
		});
  	};
    $scope.userList();

    $scope.projectSave = function() {
    //console.log(cart);
    //console.log(total);
    //alert(11);
    //console.log($rootScope.projectSelectUserGroup);
    //return false;
    
    //return false;
    if($scope.project.name == ''){
    	var alertPopup = $ionicPopup.alert({
          title: 'Project',
          template: 'Please enter project name'
        });
        return false;
    }
    $ionicLoading.show({
      template: 'Loading...'
    });
    if(typeof($scope.project.embed_video) != "undefined" && $scope.project.embed_video != ''){
        $scope.youtubeTag='youtu.be';
        $scope.facebookTag='www.facebook.com';
        $scope.videoEmbIFrame='';
        if($scope.project.embed_video.indexOf($scope.youtubeTag) > -1){
            $scope.videoEmbSplit = $scope.project.embed_video.split('youtu.be/');
            $scope.videoEmbIFrame='<iframe width="560" height="315" src="https://www.youtube.com/embed/'+$scope.videoEmbSplit[1]+'" frameborder="0" allowfullscreen></iframe>';
        }else if($scope.project.embed_video.indexOf($scope.facebookTag) > -1){
            $scope.videoEmbIFrame='<iframe src="https://www.facebook.com/plugins/video.php?href='+$scope.project.embed_video+'&show_text=0&width=560" width="560" height="238" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true"></iframe>';
            
        }
        $scope.project.embed_video=$scope.videoEmbIFrame;        
    }
    
    //$scope.payment_id = "pay965482";$scope.project_additional_option
    $scope.projectt = JSON.stringify($scope.project);
    //$scope.project_share_withh = JSON.stringify($scope.project_share_with);
    $scope.project_share_withh = JSON.stringify($rootScope.projectSelectUserGroup);
    //console.log($scope.project_share_with);
    $scope.project_additional_optionn = JSON.stringify($scope.project_additional_option);
    //return false;
    userService.saveProject($scope.loggedindetails.id,$scope.projectt,$scope.project_share_withh,$scope.project_additional_optionn).then(
      function (data) {        
        $ionicLoading.hide();
        //console.log(data);
        //$location.path('/home');
        $state.go('user.home','',{reload:true});
      },
      function (errorMessage) {
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
          title: errorMessage,
          template: errorMessage
        });
      });

  }

  
  $scope.gotoUserGroup = function() {
  	$rootScope.project_name_for_add = $scope.project.name;
  	$state.go('user.addusergroup');
  }
  
    $scope.checkVideoEmb = function() {
       // console.log('ho');
        $scope.videoEmb=$scope.project.embed_video;
        /*$scope.openIframeTag='<iframe';
        $scope.closeIframeTag='</iframe>';*/
        $scope.openIframeTag='https://';
        $scope.youtubeTag='youtu.be';
        $scope.facebookTag='www.facebook.com';
        $scope.videoEmbIFrame='';
        if(typeof($scope.videoEmb) != "undefined" && $scope.videoEmb!=''){ 
            if ($scope.videoEmb.indexOf($scope.openIframeTag) > -1 && ($scope.videoEmb.indexOf($scope.youtubeTag) > -1 || $scope.videoEmb.indexOf($scope.facebookTag) > -1)) {
                if($scope.videoEmb.indexOf($scope.youtubeTag) > -1){
                    $scope.videoEmbSplit = $scope.videoEmb.split('youtu.be/');
                    $scope.videoEmbIFrame='<iframe width="560" height="315" src="https://www.youtube.com/embed/'+$scope.videoEmbSplit[1]+'" frameborder="0" allowfullscreen></iframe>';
                }else if($scope.videoEmb.indexOf($scope.facebookTag) > -1){
                    $scope.videoEmbIFrame='<iframe src="https://www.facebook.com/plugins/video.php?href='+$scope.videoEmb+'&show_text=0&width=560" width="560" height="238" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true"></iframe>';
                    //$scope.videoEmbIFrame='<iframe src="https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/PreciousMomentPixel/videos/1250865488363912/&show_text=0&width=560" width="560" height="238" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true"></iframe>';
                }
                $rootScope.project_embed_video = $scope.videoEmbIFrame;
                $rootScope.project_embed_vlink = $scope.videoEmb;
                $state.go('user.displayvideo');
            } else {
                var alertPopup = $ionicPopup.alert({
                    title: 'Alert!',
                    template: 'Please provide a valid embed video stream.'
                });
                $scope.project.embed_video='';
                $scope.show_video.show_video_text=false;
            }
        }else{
            var alertPopup = $ionicPopup.alert({
                title: 'Alert!',
                template: 'Provide embed video first.'
            });
            $scope.show_video.show_video_text=false;
        }
    }
    
    $scope.emb_video_link = function() {
        //$scope.videoEmbLinkData=$rootScope.project_embed_video;
        $scope.videoEmbLinkData=$sce.trustAsHtml($rootScope.project_embed_video);
    }
    
    $scope.back_to_project_page = function() { 
        $state.go('user.add_job');
    }
      
});