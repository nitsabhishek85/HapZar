app.controller('GroupChatCtrl', function ($scope,$rootScope, $stateParams,$location,$q,ionicMaterialInk,$ionicScrollDelegate,$timeout,$ionicPopup,myAuth,$ionicLoading,userService) {
    //ionic.material.ink.displayEffect();
    ionicMaterialInk.displayEffect();
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
  $scope.loggedindetails = myAuth.getUserNavlinks();

  $scope.chatset={
    email:''
  };
  $scope.msg= '';
  $scope.projectId=$stateParams.id;
  $scope.projectUniqueId=$stateParams.id+'project';
  

  $scope.senderName=$scope.loggedindetails.first_name+' '+$scope.loggedindetails.last_name;
  $scope.project_owner_id ='';
  $scope.project_owner_name ='';

  if($scope.loggedindetails){        
  }else{
    $location.path('/');
  }

  $rootScope.GroupChatList = [];

  $scope.getUserById = function() {
    $ionicLoading.show({
      template: 'Loading...'
    });
    userService.getProjectDetail($stateParams.id).then(
        function (data) {
          //console.log(data);          
          //$scope.userinfo = data.UserDetails;
          $scope.projectInfo = data.PrjList;          
          $scope.project_name =$scope.projectInfo.name;
          $scope.project_owner_id =$scope.projectInfo.user_id;
          $scope.project_owner_name =$scope.projectInfo.first_name+' '+$scope.projectInfo.last_name;
          $scope.projectId = $scope.projectInfo.id;
          //alert($scope.project_owner_id);
          //console.log($scope.project_owner_id);
          //$scope.recieverName = $scope.userinfo[0].name;
          $ionicLoading.hide();
        },
        function (errorMessage) {
          
        });
  }
  if($scope.loggedindetails){
    $scope.getUserById();          
  } 

  //var db = $scope.db = $cordovaSQLite.openDB({ name: "my.db", location: "default" });

  //$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS GroupChatTable (id integer primary key, senderId integer, reciverId integer,message text,senderName text,recieverName text,projectId integer)");



if ($scope.loggedindetails) {
        $rootScope.socket = io('http://111.93.169.90:8097', { query: "userId=" + $scope.loggedindetails.id });
        console.log($rootScope.socket);
        var room = {
          'room_name': $scope.projectUniqueId
        };
        $rootScope.socket.emit('join:room', room);
        if ($scope.projectId) {
            $rootScope.socket.emit('get_connected_users');
            $rootScope.socket.on('sent_connected_users', function (res) {
                console.log(res);
                /*res = res.toString();
                if (res.includes($scope.project_owner_id)) {
                    $scope.IsOnline = true;
                }
                else {
                    $scope.IsOnline = false;
                }*/
            });
        }
    }

    $scope.get_chat = function () {
      $ionicLoading.show({
      template: 'Loading...'
    });
      userService.groupChatList($stateParams.id).then(
        function (data) {  
          console.log(data);
          $scope.clist = data.chat;
          angular.forEach($scope.clist, function (itemval) {
              var obj = { message: itemval.message, id: itemval.id, senderId:itemval.senderId, reciverId:itemval.reciverId, senderName:itemval.senderName, recieverName:itemval.recieverName, projectId:itemval.projectId };
                $rootScope.GroupChatList.push(obj);
          });       
          $timeout(function () {
              $ionicScrollDelegate.scrollBottom();
          }, 800);
              //$scope.chatMessagelist = data.userList;              
              $ionicLoading.hide();          
          },
        function (errorMessage) {
          //$scope.todouserlist = [];
          $ionicLoading.hide();       
          
      });
      /*var query = "SELECT * FROM GroupChatTable where projectId=? order by id asc;";
    $cordovaSQLite.execute(db, query, [$scope.projectId]).then(function (data) {
        
        for (var i = 0; i < data.rows.length; i++) {
            
            
          var obj = { message: data.rows.item(i).message == null ? undefined : data.rows.item(i).message, id: data.rows.item(i).id, senderId:data.rows.item(i).senderId, recieverId:data.rows.item(i).reciverId, senderName:data.rows.item(i).senderName, recieverName:data.rows.item(i).recieverName,projectId:data.rows.item(i).projectId };
                $rootScope.GroupChatList.push(obj);
            
            
        }
        $timeout(function () {
            $ionicScrollDelegate.scrollBottom();
        }, 800);
        $ionicLoading.hide();
        //console.log($rootScope.GroupChatList);
    }, function (err) {
        console.error(JSON.stringify(err));
    });*/
    }

    $scope.get_chat();

    

    $scope.send_chat = function () {
      //alert($scope.chatset.email);
      //return false;
        $scope.isdiplay = false;
        if ($scope.chatset.email != "") {
          
            console.log($scope.chatset.email);
            var data = '';
            var reciverId = $scope.project_owner_id;
            $scope.msgchat = '';
            $scope.msgchat = $scope.chatset.email;
            var randomnumberr = Math.ceil(Math.random()*1000)
            var randomidd = new Date().getTime();
            $scope.unique_no = randomidd+randomnumberr;

            data = { uniqueName:$scope.projectUniqueId,unique_no:$scope.unique_no,senderId: $scope.loggedindetails.id,senderName: $scope.senderName, recieverId: $scope.project_owner_id, recieverName:$scope.project_owner_name, message: $scope.msgchat,projectId:$scope.projectId};
            data = JSON.stringify(data);
            console.log(data);
            //$rootScope.socket.emit('chat_send', data);
            $rootScope.socket.emit('send:message', data);
            var pushData = { message: $scope.msgchat, id: null,senderId:$scope.loggedindetails.id,recieverId:reciverId,senderName:$scope.senderName, recieverName:$scope.project_owner_name,projectId:$scope.projectId};
                $rootScope.GroupChatList.push(pushData);
                 $timeout(function () {
                    $ionicScrollDelegate.scrollBottom();
                }, 400);
            userService.saveGroupChat($scope.loggedindetails.id,reciverId,$scope.msgchat,$scope.projectId).then(
              function (data) {  
                console.log(data);
                
                          
                },
              function (errorMessage) {
                //$scope.todouserlist = [];                     
                
            });
            $scope.chatset.email = '';
            
            /*var query = "INSERT INTO GroupChatTable (senderId, reciverId,message,senderName,recieverName,projectId) VALUES (?,?,?,?,?,?)";
            $cordovaSQLite.execute($scope.db, query, [$scope.loggedindetails.id, reciverId, $scope.msgchat,$scope.senderName,$scope.project_owner_name,$scope.projectId]).then(function (res) {
                var messag = "INSERT ID -> " + res.insertId;
                console.log(messag);
                var pushData = { message: $scope.msgchat, id: res.insertId,senderId:$scope.loggedindetails.id,recieverId:reciverId,senderName:$scope.senderName, recieverName:$scope.project_owner_name,projectId:$scope.projectId};
                $rootScope.GroupChatList.push(pushData);
                $scope.chatset.email = '';
                $scope.msgchat = '';
                $timeout(function () {
                    $ionicScrollDelegate.scrollBottom();
                }, 400);
            }, function (err) {
                console.error(err);
                //alert(err);
            });*/

            
            
            
        }
        else {
            var alertPopup = $ionicPopup.alert({
                title: 'Incorect',
                template: 'Please type your message first to send it.'
            });
        }

    }


    $rootScope.socket.on('chat_rcv_group', function (data) {
        console.log('received');
        $scope.show = true;
        console.log("chat recieved" + data);
        //console.log($scope.userInfo);
        data = JSON.parse(data);
        console.log($rootScope.messageGroupCheckArray);
        $scope.isPresentt = $rootScope.messageGroupCheckArray.indexOf(parseInt(data.unique_no));
        if($scope.isPresentt == -1){
          $rootScope.messageGroupCheckArray.push(data.unique_no);
            /*var query = "INSERT INTO GroupChatTable (senderId, reciverId,message,senderName,recieverName,projectId) VALUES (?,?,?,?,?,?)";
            $cordovaSQLite.execute($scope.db, query, [data.senderId, $scope.project_owner_id, data.message,data.senderName,$scope.project_owner_name,data.projectId]).then(function (res) {
            var messag = "INSERT ID -> " + res.insertId;
                //console.log(messag);
                //var url = data.video;
                //if ($scope.recieverId == data.senderId) {
                    //var pushData;                    
                    //pushData = { message: data.message == null ? undefined : data.message, id: res.insertId,senderId:$scope.recieverId,recieverId:$scope.loggedindetails.id };                    
                    var pushData = { message: data.message, id: res.insertId,senderId:data.senderId,recieverId:$scope.project_owner_id,senderName:data.senderName, recieverName:$scope.project_owner_name,projectId:data.projectId};
                    
                    $rootScope.GroupChatList.push(pushData);
                    $timeout(function () {
                        $ionicScrollDelegate.scrollBottom();
                    }, 400);
                //}
                //$scope.chatset.email = '';
                //$scope.msgchat = '';                

            }, function (err) {
                console.error(err);
                //alert(err);
            });*/
            var pushData = { message: data.message, id: null,senderId:data.senderId,recieverId:$scope.project_owner_id,senderName:data.senderName, recieverName:$scope.project_owner_name,projectId:data.projectId};
                    
            $rootScope.GroupChatList.push(pushData);
            $timeout(function () {
                $ionicScrollDelegate.scrollBottom();
            }, 400);
        }
        
        
    });
    
    $scope.create_room = function (room) {
      var room = {
          'room_name': room
      };
      $rootScope.socket.emit('join:room', room);
    }
    
    
    $scope.backAlert = function() {
        $location.path('/alert');
    }

});