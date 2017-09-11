app.controller('AlertCtrl', function ($scope,$rootScope,$location, $stateParams, ionicMaterialInk,userService,$ionicPopup,$ionicLoading,myAuth) {
    //ionic.material.ink.displayEffect();
    ionicMaterialInk.displayEffect();

    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    $scope.loggedindetails = myAuth.getUserNavlinks();
    if($scope.loggedindetails){
          
    }else{
      $location.path('/');
    }
    $scope.alertInfo = [];
    $scope.project_filter = {};
    $scope.project_filter.comment = '';
    $scope.alertListing = function(data) {
      $ionicLoading.show({
        template: 'Loading...'
      });
      userService.getAlertList($scope.loggedindetails.id).then(
        function (data) {          
          $scope.alertInfo = data.NotificationList;          
          $ionicLoading.hide();
        },
    function (errorMessage) {
      $ionicLoading.hide();
      $scope.alertInfo = [];
      var alertPopup = $ionicPopup.alert({
        title: 'Notification',
        template: 'No project found'
      });      
    });
    }

    $scope.alertListing();

    $scope.alertDetail = function(alert_id,p_id,user_id) {
      $ionicLoading.show({
          template: 'Loading...'
        });
        userService.checkProject(p_id).then(
          function (data1) {        
                  
            userService.saveAlert(0,alert_id).then(
                function (data) {        
                        
                  $ionicLoading.hide();
                  $location.path('/alert_info/'+alert_id+'/'+p_id+'/'+user_id);

                },
            function (errorMessage) {
              $ionicLoading.hide();
              //$scope.alertInfo = [];
              var alertPopup = $ionicPopup.alert({
                title: 'Alert',
                template: errorMessage
              });      
            });

          },
      function (errorMessage) {
        $ionicLoading.hide();
        //$scope.alertInfo = [];
        var alertPopup = $ionicPopup.alert({
          title: 'Alert',
          template: errorMessage
        });      
      });

        
      
    }

     $scope.prodetail = function(pro_id,to_id) {
        userService.checkProject(pro_id).then(
            function (data) {       
                    
              $location.path('/user_project_details/'+pro_id+'/'+to_id);

            },
        function (errorMessage) {
          $ionicLoading.hide();
          //$scope.alertInfo = [];
          var alertPopup = $ionicPopup.alert({
            title: 'Alert',
            template: errorMessage
          });      
        });      
    }

    $scope.alertTaskDetail = function(alert_id,pro_id,to_id) {

      $ionicLoading.show({
          template: 'Loading...'
        });
      userService.checkProject(pro_id).then(
          function (data1) { 

            userService.saveAlert(0,alert_id).then(
                function (data) {        
                        
                  $ionicLoading.hide();
                  $location.path('/user_project_details/'+pro_id+'/'+to_id);

                },
            function (errorMessage) {
              $ionicLoading.hide();
              //$scope.alertInfo = [];
              var alertPopup = $ionicPopup.alert({
                title: 'Alert',
                template: errorMessage
              });      
            });
            

          },
      function (errorMessage) {
        $ionicLoading.hide();
        //$scope.alertInfo = [];
        var alertPopup = $ionicPopup.alert({
          title: 'Alert',
          template: errorMessage
        });      
      });
        
      //$location.path('/user_project_details/'+pro_id);
    }

    $scope.gotoProjectChat = function (p_id) {    

      $location.path('/groupchat/'+p_id);

    }

    $scope.orderProperty = '';
    $scope.setOrderProperty = function(propertyName) {
        if ($scope.orderProperty === propertyName) {
            $scope.orderProperty = '-' + propertyName;
        } else if ($scope.orderProperty === '-' + propertyName) {
            $scope.orderProperty = propertyName;
        } else {
            $scope.orderProperty = propertyName;
        }
    };
    
    
    
});