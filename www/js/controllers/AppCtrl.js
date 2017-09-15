app.controller('AppCtrl', function ($scope,$rootScope,$http,$timeout, $ionicModal,$ionicHistory, $ionicPopover, $timeout,myAuth,$location) {
    // Form data for the login modal
    $scope.loginData = {};

    var navIcons = document.getElementsByClassName('ion-navicon');
    $rootScope.messageCheckArray =[];
    $rootScope.messageGroupCheckArray =[];
    $rootScope.projectSelectUserGroup =[];
    $rootScope.projectSelectUser =[];
    $rootScope.projectSelectGroup =[];
    $rootScope.projectSelectUserName =[];
    $rootScope.projectSelectGroupName =[];
    $rootScope.projectGroupRelatedUserName =[];
    $rootScope.projectSelectedName = '';
    $rootScope.projectSelectedName = '';
    $rootScope.project_name_for_add ='';
    $rootScope.orderProperty = '';
    $rootScope.project_filter = {};
    $rootScope.project_filter.name = ''
    $rootScope.projectfilter ={type:1};
    $rootScope.todofilter ={type:1};
    $rootScope.friends_filter = {name:''};
    $rootScope.friends_project_filter = {name:''};
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function () {
            this.classList.toggle('active');
        });
    }
    $scope.$on("$ionicView.enter", function () {
        //alert('CHANGED')
   $ionicHistory.clearCache();
   $ionicHistory.clearHistory();
});

    /*var fab = document.getElementById('fab');
    fab.addEventListener('click', function () {
        //location.href = 'https://twitter.com/satish_vr2011';
        window.open('https://twitter.com/satish_vr2011', '_blank');
    });*/

    // .fromTemplate() method
    var template = '<ion-popover-view>' +
                    '   <ion-header-bar>' +
                    '       <h1 class="title">My Popover Title</h1>' +
                    '   </ion-header-bar>' +
                    '   <ion-content class="padding">' +
                    '       My Popover Contents' +
                    '   </ion-content>' +
                    '</ion-popover-view>';

    $scope.popover = $ionicPopover.fromTemplate(template, {
        scope: $scope
    });
    $scope.closePopover = function () {
        $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.popover.remove();
    });

    $scope.userLogout=function(){
    //myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    //$scope.userloggedindetails = myAuth.getUserNavlinks();
    //$scope.user_type = $scope.userloggedindetails.user_type;
    //console.log($scope.user_type);

    /*var encodedString = 'senderId=' + encodeURIComponent(senderId)+
          '&reciverId=' + encodeURIComponent(reciverId)+
          '&message=' + encodeURIComponent(message)+
          '&projectId=' + encodeURIComponent(projectId);
        var request = $http({
          method: "POST",
          url: $rootScope.serviceurl+"users/groupVideoChatSave",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: encodedString
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );*/
        
    //$scope.loggedinuserdetails = myAuth.getUserNavlinks();
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    $scope.loggedinuserdetails = myAuth.getUserNavlinks();
    
    var encodedString = 'userId=' + encodeURIComponent($scope.loggedinuserdetails.id);
    var request = $http({
          method: "POST",
          url: $rootScope.serviceurl+"users/logout",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: encodedString
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
    
    myAuth.resetUserinfo();
    localStorage.setItem('users', null);
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    $scope.loggedindetails = myAuth.getUserNavlinks();
    
    $rootScope.loggedindetailss = myAuth.getUserNavlinks();

    $scope.loggedindetails = '';
    $rootScope.loggedindetailss = '';
    console.log($scope.loggedindetails);
    $scope.loggedin = false;
    $scope.notloggedin = true;
    //Notification.success('successfully logged out');
    $location.path("/");
  };
       
});