app.controller('ChatCtrl', function ($scope,$rootScope, $stateParams,$location,$q,ionicMaterialInk,$ionicScrollDelegate,$timeout,$ionicPopup,myAuth,$ionicLoading,userService) {
    //ionic.material.ink.displayEffect();
    ionicMaterialInk.displayEffect();
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
  $scope.loggedindetails = myAuth.getUserNavlinks();
  
  $scope.IsOnline = '';
  $scope.chatset={
    email:''
  };
  $scope.msg= '';
  $scope.recieverId=$stateParams.id;

  if($scope.loggedindetails){        
  }else{
    $location.path('/');
  }

  $rootScope.ChatList = [];

  $scope.getUserById = function() {
    $ionicLoading.show({
      template: 'Loading...'
    });
    userService.getUserInfo($stateParams.id).then(
        function (data) {
          console.log(data);          
          $scope.userinfo = data.UserDetails;
          $scope.profile_image_urll =$scope.userinfo[0].profile_image_url;
          $scope.profile_name =$scope.userinfo[0].name;
          $scope.recieverId = $scope.userinfo[0].id;
          //alert($scope.recieverId);
          console.log($scope.recieverId);
          $scope.recieverName = $scope.userinfo[0].name;
          $ionicLoading.hide();
        },
        function (errorMessage) {
          
        });
  }
  if($scope.loggedindetails){
    $scope.getUserById();
  } 

  //var db = $scope.db = $cordovaSQLite.openDB({ name: "my.db", location: "default" });

  //$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS ChatTable (id integer primary key, senderId integer, reciverId integer,message text)");


if ($scope.loggedindetails) {
        if(($rootScope.socket == 'undifined') || ($rootScope.socket == null)){
              $rootScope.socket = io('http://111.93.169.90:8097', { query: "userId=" + $scope.loggedindetails.id });
        }else{
          
        }
        
        console.log($rootScope.socket);
        if ($scope.recieverId) {
            $rootScope.socket.emit('get_connected_users');
            $rootScope.socket.on('sent_connected_users', function (res) {
                console.log(res);
                res = res.toString();
                if (res.includes($scope.recieverId)) {
                    $scope.IsOnline = true;
                }
                else {
                    $scope.IsOnline = false;
                }
            });
        }
    }
    $scope.clist = [];
    $scope.get_chat = function () {
      $ionicLoading.show({
      template: 'Loading...'
    });
      userService.chatList($scope.loggedindetails.id,$stateParams.id).then(
        function (data) {  
          console.log(data);
          $scope.clist = data.chat;
          angular.forEach($scope.clist, function (itemval) {
              var obj = { message: itemval.message, id: itemval.id, senderId:itemval.senderId, reciverId:itemval.reciverId };
                $rootScope.ChatList.push(obj);
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
      /*var query = "SELECT * FROM ChatTable where senderId=? and reciverId=? or senderId=? and reciverId=? order by id asc;";
    $cordovaSQLite.execute(db, query, [$scope.loggedindetails.id, $scope.recieverId, $scope.recieverId, $scope.loggedindetails.id]).then(function (data) {
        
        for (var i = 0; i < data.rows.length; i++) {
            
            
          var obj = { message: data.rows.item(i).message == null ? undefined : data.rows.item(i).message, id: data.rows.item(i).id, senderId:data.rows.item(i).senderId, reciverId:data.rows.item(i).reciverId };
                $rootScope.ChatList.push(obj);
            
            
        }
        $timeout(function () {
            $ionicScrollDelegate.scrollBottom();
        }, 800);
        $ionicLoading.hide();        
        
        //console.log($rootScope.ChatList);

    }, function (err) {
        console.error(JSON.stringify(err));
    });*/
    }

    $scope.get_chat();


    $scope.send_chat = function () {
      //alert($scope.chatset.email);
      //return false;
        $scope.isdiplay = false;
        console.log($scope.IsOnline);
        if ($scope.chatset.email != "") {
            console.log($scope.chatset.email);
            var data = '';
            var reciverId = $scope.recieverId;
            $scope.msgchat = '';
            $scope.msgchat = $scope.chatset.email;
            var randomnumber = Math.ceil(Math.random()*1000)
            var randomid = new Date().getTime();
            $scope.unique_no = randomid+randomnumber;
            //alert(id);
            //alert(randomid+randomnumber);

            data = { senderId: $scope.loggedindetails.id, recieverId: reciverId, message: $scope.msgchat,unique_no: $scope.unique_no};
            data = JSON.stringify(data);
            console.log(data);
            $rootScope.socket.emit('chat_send', data);
            var pushData = { message: $scope.msgchat, id: null,senderId:$scope.loggedindetails.id,recieverId:reciverId};
                $rootScope.ChatList.push(pushData);
            userService.saveChat($scope.loggedindetails.id,reciverId,$scope.msgchat).then(
              function (data) {  
                console.log(data);
                
                
                
                 $timeout(function () {
                    $ionicScrollDelegate.scrollBottom();
                }, 400);
                          
                },
              function (errorMessage) {
                //$scope.todouserlist = [];                     
                
            });
            $scope.chatset.email = '';
            
            /*var query = "INSERT INTO ChatTable (senderId, reciverId,message) VALUES (?,?,?)";
            $cordovaSQLite.execute($scope.db, query, [$scope.loggedindetails.id, reciverId, $scope.msgchat]).then(function (res) {
                var messag = "INSERT ID -> " + res.insertId;
                console.log(messag);
                var pushData = { message: $scope.msgchat, id: res.insertId,senderId:$scope.loggedindetails.id,recieverId:reciverId};
                $rootScope.ChatList.push(pushData);
                $timeout(function () {
                    $ionicScrollDelegate.scrollBottom();
                }, 400);
                $scope.chatset.email = '';
                $scope.msgchat = '';
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


    $rootScope.socket.on('chat_rcv', function (data) {
        console.log('received');
        $scope.show = true;
        console.log("chat recieved" + data);
        data = JSON.parse(data);
        
        $scope.isPresent = $rootScope.messageCheckArray.indexOf(parseInt(data.unique_no));
        
        if($scope.isPresent == -1){

        if (data.recieverId == $scope.loggedindetails.id) {
            $rootScope.messageCheckArray.push(data.unique_no);
            //var query = "INSERT INTO ChatTable (senderId, reciverId,message) VALUES (?,?,?)";
            /*$cordovaSQLite.execute($scope.db, query, [data.senderId, $scope.loggedindetails.id, data.message]).then(function (res) {
                var messag = "INSERT ID -> " + res.insertId;
                
                if ($scope.recieverId == data.senderId) {
                    var pushData;                    
                    pushData = { message: data.message == null ? undefined : data.message, id: res.insertId,senderId:$scope.recieverId,recieverId:$scope.loggedindetails.id };                    
                    $rootScope.ChatList.push(pushData);
                    $timeout(function () {
                        $ionicScrollDelegate.scrollBottom();
                    }, 400);
                }
                
                $scope.msgchat = '';                

            }, function (err) {
                console.error(err);
                //alert(err);
            });*/
            var pushData;                    
            pushData = { message: data.message == null ? undefined : data.message, id: null,senderId:$scope.recieverId,recieverId:$scope.loggedindetails.id };                    
            $rootScope.ChatList.push(pushData);
            $timeout(function () {
                $ionicScrollDelegate.scrollBottom();
            }, 400);
        }
      }
    });
    



});