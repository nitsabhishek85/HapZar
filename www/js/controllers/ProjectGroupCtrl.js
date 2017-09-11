app.controller('ProjectGroupCtrl', function ($scope,$rootScope,$location,$state, $stateParams, ionicMaterialInk,userService,$ionicPopup,$ionicLoading,myAuth,$cordovaContacts) {
    //ionic.material.ink.displayEffect();
    ionicMaterialInk.displayEffect();

    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
	  $scope.loggedindetails = myAuth.getUserNavlinks();
	  if($scope.loggedindetails){	        
	  }else{
      $location.path('/');
    }

    $scope.tabGroup = 1;
    $scope.secondTabGroupAdd = 1;
    $scope.userList = [];
    $scope.groupList = [];
    $scope.userGroupList=[];
    $scope.groupId = '';
    $scope.groupName = '';
    $scope.group={
      name:''
    };
    //$scope.tabStore = 1;
    
    $scope.tabClick = function(type) {
      $scope.tabGroup = type;
      $scope.favouriteList();
    }

    /*$scope.favouriteList = function() {      
      $ionicLoading.show({
        template: 'Loading...'
      });
      userService.getFavouriteList($scope.loggedindetails.id).then(
        function (data) {        
          $scope.userList = data.userList ;  
          angular.forEach($scope.userList, function (itemval) {
                if (itemval.is_favourite == 1) {
                  itemval.favourite = true;                
                }else{
                  itemval.favourite = false; 
                }
            });   
          $ionicLoading.hide();


          //$location.path('/user_project_details/'+$stateParams.id);

        },
    function (errorMessage) {
      $ionicLoading.hide();
      //$scope.alertInfo = [];
      $scope.userList = [];
      var alertPopup = $ionicPopup.alert({
        title: 'Favourite',
        template: errorMessage
      });      
    });
    }*/
    $scope.favouriteList = function() {      
      $ionicLoading.show({
        template: 'Loading...'
      });
      userService.getGroupFavouriteList($scope.loggedindetails.id).then(
        function (data) {        
          $scope.userList = data.favoriteList ; 
          angular.forEach($scope.userList, function (itemval) {
              if(itemval.is_group == 1){                  
                $scope.keyindex = '';
                $scope.keyindex = $rootScope.projectSelectGroup.indexOf(itemval.id);                 
                
                if($scope.keyindex > -1 ){
                  itemval.is_selected = true; 
                }else{
                  itemval.is_selected = false;
                }                  
              }
              else if(itemval.is_group == 0){                  
                $scope.keyindex = '';
                $scope.keyindex = $rootScope.projectSelectUser.indexOf(itemval.id);                 
                
                if($scope.keyindex > -1 ){
                  itemval.is_selected = true; 
                }else{
                  //itemval.is_selected = false;
                  $scope.userindex = '';
                  $scope.userindex = $rootScope.projectGroupRelatedUserName.indexOf(itemval.id);
                  if($scope.userindex > -1 ){
                    itemval.is_selected = true;
                  }else{
                    itemval.is_selected = false;
                  }
                }                  
              }
          }); 
            
          $ionicLoading.hide();


          //$location.path('/user_project_details/'+$stateParams.id);

        },
    function (errorMessage) {
      $ionicLoading.hide();      
      $scope.userList = [];
      var alertPopup = $ionicPopup.alert({
        title: 'Favourite',
        template: errorMessage
      });      
    });
    }
    $scope.favouriteList();

    $scope.tabSecond = function(type) {  
    $scope.group.name = '';   
      $ionicLoading.show({
        template: 'Loading...'
      });
      //userService.getGroupList($scope.loggedindetails.id).then(
      userService.getuserList($scope.loggedindetails.id).then(
        function (data) {        
          //$scope.groupList = data.groupList ;
          $scope.groupList = data.UserList ;  
          angular.forEach($scope.groupList, function (itemval) {
                /*if (itemval.is_favourite == 1) {
                  itemval.favourite = true;                
                }else{
                  itemval.favourite = false; 
                }*/
                if(itemval.is_group == 1){                  
                  $scope.keyindex = '';
                  $scope.keyindex = $rootScope.projectSelectGroup.indexOf(itemval.id);                 
                  
                  if($scope.keyindex > -1 ){
                    itemval.is_selected = true; 
                  }else{
                    itemval.is_selected = false;
                  }                  
                }
                else if(itemval.is_group == 0){                  
                  $scope.keyindex = '';
                  $scope.keyindex = $rootScope.projectSelectUser.indexOf(itemval.id);                 
                  
                  if($scope.keyindex > -1 ){
                    itemval.is_selected = true; 
                  }else{
                    itemval.is_selected = false;
                  }                  
                }

            });  
          /*angular.forEach($scope.userList, function (itemval) {
                if (itemval.is_favourite == 1) {
                  itemval.favourite = true;                
                }else{
                  itemval.favourite = false; 
                }
            });*/   
            $scope.tabGroup = 2;
          $scope.secondTabGroupAdd = 1;
          $ionicLoading.hide();

        },
    function (errorMessage) {
      $ionicLoading.hide();
      //$scope.alertInfo = [];
      $scope.groupList = [];
      $scope.tabGroup = 2;
      /*var alertPopup = $ionicPopup.alert({
        title: 'Favourite',
        template: errorMessage
      });  */    
    });

    }

    $scope.userFriendList = [];
    $scope.tabFriend = function() {
      $scope.tabGroup = 3;
      $ionicLoading.show({
        template: 'Loading...'
      });
      userService.getuserList($scope.loggedindetails.id).then(
        function (data) {        
          //$scope.groupList = data.groupList ;
          $scope.userFriendList = data.UserList ;  
          angular.forEach($scope.userFriendList, function (itemval) {
              if(itemval.is_group == 1){                  
                $scope.keyindex = '';
                $scope.keyindex = $rootScope.projectSelectGroup.indexOf(itemval.id);                 
                
                if($scope.keyindex > -1 ){
                  itemval.is_selected = true; 
                }else{
                  itemval.is_selected = false;
                }                  
              }
              else if(itemval.is_group == 0){                  
                $scope.keyindex = '';
                $scope.keyindex = $rootScope.projectSelectUser.indexOf(itemval.id);                 
                
                if($scope.keyindex > -1 ){
                  itemval.is_selected = true; 
                }else{
                  //alert(1);
                  // /console.log($rootScope.projectGroupRelatedUserName);
                  $scope.userindex = '';
                  $scope.userindex = $rootScope.projectGroupRelatedUserName.indexOf(itemval.id);
                  if($scope.userindex > -1 ){
                    itemval.is_selected = true;
                  }else{
                    itemval.is_selected = false;
                  }
                  
                }                  
              }
          });  
           
            $scope.tabGroup = 3;
          //$scope.secondTabGroupAdd = 1;
          $ionicLoading.hide();

        },
    function (errorMessage) {
      $ionicLoading.hide();
      //$scope.alertInfo = [];
      $scope.userFriendList = [];
      $scope.tabGroup = 3;
         
    });
      /*userService.getFriendList($scope.loggedindetails.id).then(
        function (data) {        
          $scope.userFriendList = data.userList ;  
            
          $ionicLoading.hide();
          $scope.tabGroup = 3;
        },
    function (errorMessage) {
      $ionicLoading.hide();
      //$scope.alertInfo = [];
      $scope.userFriendList = [];
      $scope.tabGroup = 3;
          
    });*/
      
    }

    
    $scope.tabThird = function(groupId,groupName) {
      $scope.groupId = groupId;
      $scope.groupName = groupName;
      $scope.tabGroup = 3;
      /*$ionicLoading.show({
        template: 'Loading...'
      });
      userService.getGroupUserList($scope.loggedindetails.id,$scope.groupId).then(
        function (data) {        
          $scope.userGroupList = data.userList ;  
          angular.forEach($scope.userGroupList, function (itemval) {
                if (itemval.is_favourite == 1) {
                  itemval.favourite = true;                
                }else{
                  itemval.favourite = false; 
                }
            });   
          $ionicLoading.hide();
          $scope.tabGroup = 3;
        },
    function (errorMessage) {
      $ionicLoading.hide();
      //$scope.alertInfo = [];
      $scope.userGroupList = [];
      $scope.tabGroup = 3;
          
    });*/

    }

    $scope.tabGroupUser = function(groupId,groupName) {
      $scope.groupId = groupId;
      $scope.groupName = groupName;
      //$scope.tabGroup = 3;
      $ionicLoading.show({
        template: 'Loading...'
      });
      userService.getGroupUserList($scope.loggedindetails.id,$scope.groupId).then(
        function (data) {        
          $scope.userGroupList = data.userList ;  
          angular.forEach($scope.userGroupList, function (itemval) {
                if (itemval.is_favourite == 1) {
                  itemval.favourite = true;                
                }else{
                  itemval.favourite = false; 
                }
            });   
          $ionicLoading.hide();
          $scope.tabGroup = 2;
          $scope.secondTabGroupAdd = 2;
        },
    function (errorMessage) {
      $ionicLoading.hide();
      //$scope.alertInfo = [];
      $scope.userGroupList = [];
      $scope.tabGroup = 2;
      $scope.secondTabGroupAdd = 2;
      //$scope.tabGroup = 3;
      /*var alertPopup = $ionicPopup.alert({
        title: 'Favourite',
        template: errorMessage
      });  */    
    });

    }

    $scope.saveUserGroup = function(to_user_id) {
      
      $ionicLoading.show({
        template: 'Loading...'
      });
      userService.groupUserSave(to_user_id,$scope.groupId,$scope.loggedindetails.id).then(
        function (data) {        
            
          $ionicLoading.hide();
          $scope.tabGroup = 2;
          $scope.secondTabGroupAdd = 2;
          $scope.tabGroupUser($scope.groupId,$scope.groupName);
        },
    function (errorMessage) {
      $ionicLoading.hide();
      
      $scope.tabGroup = 2;
      $scope.secondTabGroupAdd = 2;
      $scope.tabGroupUser($scope.groupId,$scope.groupName);
        
    });

    }

    $scope.saveGroup = function() {
      if($scope.group.name == ''){
          var alertPopup = $ionicPopup.alert({
            title: 'Group',
            template: 'Please enter group name'
          }); 
      }else{
        $ionicLoading.show({
        template: 'Loading...'
      });
      userService.saveGroup($scope.group.name,$scope.loggedindetails.id).then(
        function (data) {        
            
          $ionicLoading.hide();
          $scope.tabGroup = 2;
          $scope.secondTabGroupAdd = 1;
          $scope.tabSecond(2);
        },
    function (errorMessage) {
      $ionicLoading.hide();
      
      $scope.tabGroup = 2;
      $scope.secondTabGroupAdd = 1;
      $scope.tabSecond(2);
        
    });
      }      

    }
    

    
    
    $scope.saveFavourite = function(favouriteinfo) {      
      $ionicLoading.show({
        template: 'Loading...'
      });
      userService.saveFavourite($scope.loggedindetails.id,favouriteinfo).then(
        function (data) {
             
          $ionicLoading.hide();
          $scope.favouriteList();

          //$location.path('/user_project_details/'+$stateParams.id);

        },
    function (errorMessage) {
      $ionicLoading.hide();
      $scope.favouriteList();
      //$scope.alertInfo = [];
      //$scope.userList = [];
           
    });
    }

    $scope.contactList = [];
    $scope.tabPhoneContact = function() {
      
      $scope.contactList = [];
      $scope.contactPhone = [];

      //console.log($cordovaContacts);
      $scope.tabGroup = 4; 
      
      $ionicLoading.show({
        template: 'Loading...'
      }); 

       $cordovaContacts.find({filter : '', fields:  ['displayName']}).then(function(allContacts) { //omitting parameter to .find() causes all contacts to be returned
          //console.log(allContacts);
          /*for (var i = 0; i < allContacts.length; i++) {
            console.log(allContacts[i].displayName);
           // var newstr = JSON.parse(allContacts[i]);
            //console.log(newstr);
            //console.log(newstr.Contact);
            //console.log(allContacts[i].Contact.phoneNumbers);
          }*/
          //console.log(allContacts);
          angular.forEach(allContacts, function (itemval) {
            console.log(itemval);
            if(typeof(itemval.phoneNumbers) != 'undifined' && itemval.phoneNumbers !== null){
              var phoneno = itemval.phoneNumbers[0].value;
              //console.log(phoneno);
              phoneno = phoneno.replace(/\D/g,'');
              //console.log(phoneno);
              //phoneno = phoneno.replace(/\D/g,'');
              phoneno = phoneno.substr(phoneno.length - 10);
              //console.log(phoneno);
              //return false;
              $scope.contacts ={phone:itemval.phoneNumbers[0].value,name:itemval.displayName};
              $scope.phonecontactslist ={phone:phoneno,name:itemval.displayName};
              //$scope.contactList.push($scope.contacts);  
              $scope.contactPhone.push($scope.phonecontactslist);
            }
               

          });
          if($scope.contactPhone.length > 0){
              $scope.contactPhone = JSON.stringify($scope.contactPhone); 
              userService.getContactList($scope.loggedindetails.id,$scope.contactPhone).then(
                  function (data) {  
                    //console.log('11');
                    if(data.contactlist.length >0){
                        $scope.contactList = data.contactlist;
                        console.log($scope.contactList);
                        $ionicLoading.hide();
                    }else{
                        console.log('12');
                        $ionicLoading.hide();
                        $scope.contactList = [];
                        var alertPopup = $ionicPopup.alert({
                          title: 'Contact List',
                          template: 'No contact list found'
                        });
                    } 
                  },
              function (errorMessage) {
                $ionicLoading.hide();
                $scope.contactList = [];
                var alertPopup = $ionicPopup.alert({
                  title: 'Contact List',
                  template: 'No contact list found'
                });              
                     
              });
          }else{
            //console.log('13');
            $scope.contactList = [];
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'Contact List',
              template: 'No contact list found'
            });
          }
           
          
          //$scope.contacts = allContacts;
      });
    }

    // Toggle Code Wrapper
    
    
    $scope.saveUserGroupForProject = function(dataInfo) { 
      //console.log(dataInfo);
      //$rootScope.projectSelectUserName =[];
    //$rootScope.projectSelectGroupName =[];
    //$rootScope.projectSelectedName = '';
      //console.log($scope.userList);
      //console.log(dataInfo);
      if(dataInfo.is_group == 1){
        //alert(1);
        $scope.keyindex = '';
        $scope.keyindex = $rootScope.projectSelectGroup.indexOf(dataInfo.id);
        //alert($scope.keyindex);
        if(dataInfo.is_selected == true){
          if($scope.keyindex < 0 ){
            $rootScope.projectSelectGroup.push(dataInfo.id);
            $rootScope.projectSelectGroupName.push(dataInfo.name);
            $scope.sel_group = {
                user_id: dataInfo.id+','+dataInfo.email+','+dataInfo.name+','+dataInfo.is_group
              };
            $rootScope.projectSelectUserGroup.push($scope.sel_group);
            angular.forEach($scope.userList, function (userval) {
              if(userval.is_group == 0){
                $scope.userindex = '';
                $scope.userindex = dataInfo.user_ids.indexOf(userval.id);
                //console.log($scope.userindex);
                if($scope.userindex > -1 ){
                  userval.is_selected = true;
                  $rootScope.projectGroupRelatedUserName.push(userval.id);
                }
              }
            })
          }
        }else{
          if($scope.keyindex > -1 ){
            //$rootScope.projectSelectGroup.push(dataInfo.id);
            $rootScope.projectSelectGroup.splice($scope.keyindex, 1);
            $rootScope.projectSelectGroupName.splice($scope.keyindex, 1);
            $rootScope.projectSelectUserGroup.splice($scope.keyindex, 1);
            angular.forEach($scope.userList, function (userval) {
              if(userval.is_group == 0){
                $scope.userindex = '';
                $scope.userindex = dataInfo.user_ids.indexOf(userval.id);
                //console.log($scope.userindex);
                if($scope.userindex > -1 ){
                  userval.is_selected = false;
                  $rootScope.projectGroupRelatedUserName.splice($scope.userindex,1);
                }
              }
            })
          }
        }
          //console.log($rootScope.projectGroupRelatedUserName);
          
          
      }
      else if(dataInfo.is_group == 0){
        //alert(2);
          $scope.keyindex = '';
          $scope.keyindex = $rootScope.projectSelectUser.indexOf(dataInfo.id);
          if(dataInfo.is_selected == true){
            if($scope.keyindex < 0 ){
              $rootScope.projectSelectUser.push(dataInfo.id);
              $rootScope.projectSelectUserName.push(dataInfo.name);
              $scope.sel_user = {
                user_id: dataInfo.id+','+dataInfo.email+','+dataInfo.name+','+dataInfo.is_group
              };
              $rootScope.projectSelectUserGroup.push($scope.sel_user);
            }
          }else{
            if($scope.keyindex > -1 ){
              //$rootScope.projectSelectGroup.push(dataInfo.id);
              $rootScope.projectSelectUser.splice($scope.keyindex, 1);
              $rootScope.projectSelectUserName.splice($scope.keyindex, 1);
              $rootScope.projectSelectUserGroup.splice($scope.keyindex, 1);
            }
          }
      }

      
      }

      $scope.finishedSelection = function() { 
        $rootScope.projectSelectedName = '';

        angular.forEach($scope.projectSelectGroupName, function (itemval) {
            if($rootScope.projectSelectedName == ""){
              $rootScope.projectSelectedName = itemval;
            } else{
              $rootScope.projectSelectedName = $rootScope.projectSelectedName +', '+itemval;
            }
        });
        angular.forEach($scope.projectSelectUserName, function (itemval) {
            if($rootScope.projectSelectedName == ""){
              $rootScope.projectSelectedName = itemval;
            } else{
              $rootScope.projectSelectedName = $rootScope.projectSelectedName +', '+itemval;
            } 
        });
        if($rootScope.projectSelectedName == ''){
          var alertPopup = $ionicPopup.alert({
              title: 'Project',
              template: 'Please select atleast one user or group'
            });
        }else{
          $state.go('user.add_job');
        }
        //console.log($rootScope.projectSelectedName);
      }
      
      
    
});