app.service(
    "userService",
    function( $rootScope,$http, $q ) {
        // Return public API.
        return({
            loginDetails: loginDetails,
            forgotPassword: forgotPassword,
            changeforgotPassword:changeforgotPassword,
            getAllUsers: getAllUsers,
            userAdd:userAdd,
            getUser:getUser,
            userEdit:userEdit,
            userLogin:userLogin,
            userSignup:userSignup,
            userSignupVendor:userSignupVendor,
            getUserInfo:getUserInfo,
            userChangePassword:userChangePassword,
            getUserBarcodeInfo:getUserBarcodeInfo,
            getPaymentHistory:getPaymentHistory,
            savegetgoPay:savegetgoPay,
            getPayList:getPayList,
            getReceiveList:getReceiveList,
            getPrivacyPolicy:getPrivacyPolicy,
            creditCardSave:creditCardSave,
            bankSave:bankSave,
            creditCardPaySave:creditCardPaySave,
            getCustomerList:getCustomerList,
            discoverImage:discoverImage,
            userforgotpassword:userforgotpassword,
            getuserList:getuserList,
            saveProject:saveProject,
            getProjectList:getProjectList,
            fblogin:fblogin,
            getAlertList:getAlertList,
            getAlertDetail:getAlertDetail,
            saveAlert:saveAlert,
            getProjectDetail:getProjectDetail,
            gettodoList:gettodoList,
            getvideotodoList:getvideotodoList,
            getAcceptUserList:getAcceptUserList,
            saveTodo:saveTodo,
            getusertodoList:getusertodoList,
            getOtherUserList:getOtherUserList,
            getFavouriteList:getFavouriteList,
            saveFavourite:saveFavourite,
            getGroupList:getGroupList,
            getGroupUserList:getGroupUserList,
            groupUserSave:groupUserSave,
            saveGroup:saveGroup,
            getFriendList:getFriendList,
            getContactList:getContactList,
            getToDoDetail:getToDoDetail,
            closeToDo:closeToDo,
            todoStatusSave:todoStatusSave,
            todoDeleteVideoStatus:todoDeleteVideoStatus,
            todoVideoStatusSave:todoVideoStatusSave,
            getGroupFavouriteList:getGroupFavouriteList,
            closeProject:closeProject,
            checkProject:checkProject,
            assignProjectList:assignProjectList,
            allProjectList:allProjectList,
            getMyToDoList:getMyToDoList,
            getAssignToDoList:getAssignToDoList,
            getAllToDoList:getAllToDoList,
            chatList:chatList,
            groupChatList:groupChatList,
            saveChat:saveChat,
            saveGroupChat:saveGroupChat,
            saveGroupChatVideo:saveGroupChatVideo,
            editGroup:editGroup,
            deleteGroup:deleteGroup,
            getProjectGroupUserList:getProjectGroupUserList,
            delProjectUserGroup:delProjectUserGroup,
            projectDelete:projectDelete,
            editProject:editProject,
            getCompletedToDoList:getCompletedToDoList,
            getUncompletedToDoList:getUncompletedToDoList,
            todoDetails:todoDetails,
            updateTodo:updateTodo,
            saveVideoTodo:saveVideoTodo,
            editVideoTodo:editVideoTodo

        });
        // ---
        // PUBLIC METHODS.
        // ---

      function userLogin(item) {
        var encodedString = 'email=' + encodeURIComponent(item.email)+
                            '&password=' + encodeURIComponent(item.password)+
                            '&device_type=' + encodeURIComponent(item.device_type)+
                            '&device_token_id=' + encodeURIComponent(item.device_token_id);
        var request = $http({
          method: "POST",
          url: $rootScope.serviceurl+"users/appsignin",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: encodedString
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function fblogin(item) {
        var encodedString = 'email=' + encodeURIComponent(item.email)+
                            '&facebookId=' + encodeURIComponent(item.id)+
                            '&device_type=' + encodeURIComponent(item.device_type)+
                            '&first_name=' + encodeURIComponent(item.first_name)+
                            '&last_name=' + encodeURIComponent(item.last_name)+
                            '&device_token_id=' + encodeURIComponent(item.device_token_id);
        var request = $http({
          method: "POST",
          url: $rootScope.serviceurl+"users/social_login",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: encodedString
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function userforgotpassword(item) {
        var encodedString = 'email=' + encodeURIComponent(item.email);
        var request = $http({
          method: "POST",
          url: $rootScope.serviceurl+"users/forgot_password",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: encodedString
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function userSignup(item) {
        var encodedString = 'email=' + encodeURIComponent(item.email)+
          '&password=' + encodeURIComponent(item.password)+
          '&name=' + encodeURIComponent(item.name)+          
          '&device_type=' + encodeURIComponent(item.device_type)+
          '&device_token_id=' + encodeURIComponent(item.device_token_id)+
          '&lat=' + encodeURIComponent(item.lat)+
          '&mobile_number=' + encodeURIComponent(item.mobile_number)+
          '&location=' + encodeURIComponent(item.location)+
          '&lang=' + encodeURIComponent(item.lang);
        var request = $http({
          method: "POST",
          url: $rootScope.serviceurl+"users/appsignup",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: encodedString
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function userSignupVendor(item) {
        var encodedString = 'email=' + encodeURIComponent(item.email)+
          '&password=' + encodeURIComponent(item.password)+
          '&first_name=' + encodeURIComponent(item.first_name)+
          '&last_name=' + encodeURIComponent(item.last_name)+
          '&device_type=' + encodeURIComponent(item.device_type)+
          '&device_token_id=' + encodeURIComponent(item.device_token_id)+
          '&lat=' + encodeURIComponent(item.lat)+
          '&lang=' + encodeURIComponent(item.lang)+
          '&phone=' + encodeURIComponent(item.phone);
        var request = $http({
          method: "POST",
          url: $rootScope.serviceurl+"users/appshopsignup",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: encodedString
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }


        function userAdd(item,accesstoken) {
            var request = $http({
                method: "POST",
                url: $rootScope.serviceurl+"user",
                data:item,
                headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
            });
            return( request.then( handleSuccess, handleError ) );
        }

        function userEdit(item) {
          var encodedString = 'email=' + encodeURIComponent(item.email)+
            '&id=' + encodeURIComponent(item.id)+
            '&first_name=' + encodeURIComponent(item.first_name)+
            '&last_name=' + encodeURIComponent(item.last_name)+
            '&phone=' + encodeURIComponent(item.phone);
            var request = $http({
                method: "POST",
                url: $rootScope.serviceurl+"users/appupdateaccount",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data:encodedString,
               // headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
            });
            return( request.then( handleSuccess, handleError ) );
        }

      function bankSave(item) {
        var encodedString = 'user_id=' + encodeURIComponent(item.id)+
          '&bank_name=' + encodeURIComponent(item.bank_name)+
          '&legal_first_name=' + encodeURIComponent(item.legal_first_name)+
          '&legal_last_name=' + encodeURIComponent(item.legal_last_name)+
          '&bank_email=' + encodeURIComponent(item.bank_email)+
          '&ssn=' + encodeURIComponent(item.ssn)+
          '&account_no=' + encodeURIComponent(item.account_no)+
          '&routing_no=' + encodeURIComponent(item.routing_no)+
          '&dob=' + encodeURIComponent(item.dob)+
          '&stripetoken=' + encodeURIComponent(item.stripetoken)+
          '&billing_address=' + encodeURIComponent(item.billing_address)+
          '&billing_city=' + encodeURIComponent(item.billing_city)+
          '&billing_state=' + encodeURIComponent(item.billing_state)+
          '&billing_postal_code=' + encodeURIComponent(item.billing_postal_code);
        var request = $http({
          method: "POST",
          url: $rootScope.serviceurl+"users/appuserbank",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data:encodedString,
          // headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function creditCardSave(item,cart,total,cardtype,userpassword) {
        if(cardtype == 'existing'){
          var encodedString = 'id=' + encodeURIComponent(item.id)+
            '&cust_id=' + encodeURIComponent(item.cust_id)+
            '&card_first_name=' + encodeURIComponent(item.card_first_name)+
            '&card_last_name=' + encodeURIComponent(item.card_last_name)+
            '&card_email=' + encodeURIComponent(item.card_email)+
            '&exp_year=' + encodeURIComponent(item.exp_year)+
            '&exp_month=' + encodeURIComponent(item.exp_month)+
            '&cart=' + encodeURIComponent(cart)+
            '&total=' + encodeURIComponent(total)+
            '&userpassword=' + encodeURIComponent(userpassword)+
            '&stripetoken=1';
        }else{
          var encodedString = 'id=' + encodeURIComponent(item.id)+
            '&stripetoken=' + encodeURIComponent(item.stripetoken)+
            '&card_first_name=' + encodeURIComponent(item.card_first_name)+
            '&card_last_name=' + encodeURIComponent(item.card_last_name)+
            '&card_email=' + encodeURIComponent(item.card_email)+
            '&exp_year=' + encodeURIComponent(item.exp_year)+
            '&credit_card=' + encodeURIComponent(item.credit_card)+
            '&exp_month=' + encodeURIComponent(item.exp_month)+
            '&cart=' + encodeURIComponent(cart)+
            '&total=' + encodeURIComponent(total)+
            '&userpassword=' + encodeURIComponent(userpassword)+
            '&cust_id=1';
        }

        var request = $http({
          method: "POST",
          url: $rootScope.serviceurl+"cart/saveCreditCard",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data:encodedString,
          // headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function creditCardPaySave(item,pay_id,cardtype,userpassword) {
        if(cardtype == 'existing'){
          var encodedString = 'id=' + encodeURIComponent(item.id)+
            '&cust_id=' + encodeURIComponent(item.cust_id)+
            '&card_first_name=' + encodeURIComponent(item.card_first_name)+
            '&card_last_name=' + encodeURIComponent(item.card_last_name)+
            '&card_email=' + encodeURIComponent(item.card_email)+
            '&exp_year=' + encodeURIComponent(item.exp_year)+
            '&exp_month=' + encodeURIComponent(item.exp_month)+
            '&pay_id=' + encodeURIComponent(pay_id)+
            '&userpassword=' + encodeURIComponent(userpassword)+
            '&stripetoken=1';
        }else{
          var encodedString = 'id=' + encodeURIComponent(item.id)+
            '&stripetoken=' + encodeURIComponent(item.stripetoken)+
            '&card_first_name=' + encodeURIComponent(item.card_first_name)+
            '&card_last_name=' + encodeURIComponent(item.card_last_name)+
            '&card_email=' + encodeURIComponent(item.card_email)+
            '&exp_year=' + encodeURIComponent(item.exp_year)+
            '&credit_card=' + encodeURIComponent(item.credit_card)+
            '&exp_month=' + encodeURIComponent(item.exp_month)+
            '&pay_id=' + encodeURIComponent(pay_id)+
            '&userpassword=' + encodeURIComponent(userpassword)+
            '&cust_id=1';
        }

        var request = $http({
          method: "POST",
          url: $rootScope.serviceurl+"cart/saveCreditCardGetgoPay",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data:encodedString,
          // headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function savegetgoPay(from_user_id,to_user_id,amount,message) {
        var encodedString = 'from_user_id=' + encodeURIComponent(from_user_id)+
          '&to_user_id=' + encodeURIComponent(to_user_id)+
          '&amount=' + encodeURIComponent(amount)+
          '&message=' + encodeURIComponent(message);
        var request = $http({
          method: "POST",
          url: $rootScope.serviceurl+"users/appuserpay",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data:encodedString,
          // headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }


    function saveAlert(type,alert_id) {
        var is_read = 1;
        var encodedString = 'id=' + encodeURIComponent(alert_id)+
          '&is_accepted=' + encodeURIComponent(type)+
          '&is_read=' + encodeURIComponent(is_read);
        var request = $http({
          method: "POST",
          url: $rootScope.serviceurl+"users/my_notification_update",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data:encodedString,
          // headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }


      function userChangePassword(item) {

        var encodedString = 'old_password=' + encodeURIComponent(item.old_password)+
          '&id=' + encodeURIComponent(item.id)+
          '&new_password=' + encodeURIComponent(item.new_password);
        var request = $http({
          method: "POST",
          url: $rootScope.serviceurl+"users/appsecurity",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data:encodedString,
          // headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }
        // User Login
        function loginDetails(email,password) {
            var request = $http({
                method: "POST",
                url: $rootScope.serviceurl+"user/login",
                data: {
                    "email": email,
                    "password": password
                },
                headers: { 'Content-Type': 'application/json','responsetype':'json' }
            });
            return( request.then( handleSuccess, handleError ) );
        }
        function getAllUsers(accesstoken) {
            var request = $http({
                method: "GET",
                url: $rootScope.serviceurl+"user?offset=0&limit=20",
                headers: { 'Content-Type': 'application/json','offset':'0','limit':'20','accesstoken':accesstoken }
            });
            return( request.then( handleSuccess, handleError ) );
        }
        function getUser(user_id,accesstoken) {
            var request = $http({
                method: "GET",
                url: $rootScope.serviceurl+"user/"+user_id,
                headers: { 'Content-Type': 'application/json','offset':'0','limit':'20','accesstoken':accesstoken }
            });
            return( request.then( handleSuccess, handleError ) );
        }

      function getPaymentHistory(user_id,user_type) {
        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"users/apporderlistuser/"+user_id+"/"+user_type,
          //headers: { 'Content-Type': 'application/json','offset':'0','limit':'20','accesstoken':accesstoken }
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function getuserList(user_id) {
        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"users/userList/"+user_id,
          //headers: { 'Content-Type': 'application/json','offset':'0','limit':'20','accesstoken':accesstoken }
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function getPayList(user_id) {
        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"users/appuserpayhistory/"+user_id,
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function getCustomerList(user_id) {
        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"users/appcustomerlist/"+user_id,
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function discoverImage() {
        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"store/appdiscoverimage",
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function getReceiveList(user_id) {
        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"users/appuserpayrecieved/"+user_id,
        });
        return( request.then( handleSuccess, handleError ) );
      }
      
      function getToDoDetail(todo_id) {
        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"users/todo_details/"+todo_id,
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function getPrivacyPolicy(cmstype) {
        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"users/appgetcms/"+cmstype,
          //headers: { 'Content-Type': 'application/json','offset':'0','limit':'20','accesstoken':accesstoken }
        });
        return( request.then( handleSuccess, handleError ) );
      }
        // User Login
        function forgotPassword(email) {
            var request = $http({
                method: "POST",
                url: $rootScope.serviceurl+"user/forgotpassword",
                data: {
                    "email": email,
                },
                headers: { 'Content-Type': 'application/json','responsetype':'json' }
            });
            return( request.then( handleSuccess, handleError ) );
        }

        function changeforgotPassword(newpassword,useremail) {
            var request = $http({
                method: "POST",
                url: $rootScope.serviceurl+"user/changeforgotpassword",
                data: {
                    "useremail": useremail,
                    "newpassword": newpassword,

                },
                headers: { 'Content-Type': 'application/json','responsetype':'json' }
            });
            return( request.then( handleSuccess, handleError ) );
        }

      function getUserInfo(user_id) {

        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"users/details/"+user_id,
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function getProjectList(user_id) {

        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"project/my_prj_list/"+user_id,
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }
      function assignProjectList(user_id) {

        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"project/assign_prj_list/"+user_id,
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }
      function allProjectList(user_id) {

        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"project/all_prj_list/"+user_id,
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function gettodoList(user_id,project_id) {

        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"users/my_todo_list/"+user_id+'/'+project_id,
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }
      
      function getvideotodoList(project_id) {

        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"users/video_todo_list/"+project_id,
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }
      
      function getMyToDoList(user_id) {

        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"users/all_my_todo_list/"+user_id,
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }
      function getAssignToDoList(user_id) {

        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"users/all_assign_todo_list/"+user_id,
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }
      function getAllToDoList(user_id) {

        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"users/all_todo_list/"+user_id,
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }
      function getCompletedToDoList(user_id) {

        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"users/completed_todo_list/"+user_id,
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }
      function getUncompletedToDoList(user_id) {

        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"users/uncompleted_todo_list/"+user_id,
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function todoDetails(id) {

        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"users/todo_details/"+id,
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function chatList(login_id,user_id) {

        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"users/chat_list/"+login_id+"/"+user_id,
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }
      function groupChatList(project_id) {

        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"users/group_chat_list/"+project_id,
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }
      function saveChat(senderId,reciverId,message) {
        var encodedString = 'senderId=' + encodeURIComponent(senderId)+
          '&reciverId=' + encodeURIComponent(reciverId)+
          '&message=' + encodeURIComponent(message);
        var request = $http({
          method: "POST",
          url: $rootScope.serviceurl+"users/chatSave",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: encodedString
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }
      function updateTodo(todoData) {
        var encodedString = 'id=' + encodeURIComponent(todoData.id)+
          '&name=' + encodeURIComponent(todoData.name)+
          '&priority=' + encodeURIComponent(todoData.priority)+
          '&expire_date=' + encodeURIComponent(todoData.expire_date);
        var request = $http({
          method: "POST",
          url: $rootScope.serviceurl+"users/todo_edit",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: encodedString
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function saveGroupChat(senderId,reciverId,message,projectId) {
        var encodedString = 'senderId=' + encodeURIComponent(senderId)+
          '&reciverId=' + encodeURIComponent(reciverId)+
          '&message=' + encodeURIComponent(message)+
          '&projectId=' + encodeURIComponent(projectId);
        var request = $http({
          method: "POST",
          url: $rootScope.serviceurl+"users/groupChatSave",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: encodedString
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }
      
      function saveGroupChatVideo(senderId,reciverId,message,projectId) {
        var encodedString = 'senderId=' + encodeURIComponent(senderId)+
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
        return( request.then( handleSuccess, handleError ) );
      }
      
      function closeToDo(todo_id,user_id) {

        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"users/close_to_do/"+todo_id+'/'+user_id,
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }
      

      function getusertodoList(user_id,project_id) {

        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"users/user_todo_list/"+user_id+'/'+project_id,
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }
        
      function getAcceptUserList(project_id) {

        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"users/projectrelateduserlist/"+project_id,
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }
      function getAlertList(user_id) {

        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"users/my_notification/"+user_id,
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function getProjectDetail(project_id) {

        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"project/details/"+project_id,
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }
      function getAlertDetail(alert_id) {

        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"users/my_notification_details/"+alert_id,
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }
      
      function getOtherUserList(user_id) {

        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"users/otherUserList/"+user_id,
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function getUserBarcodeInfo(barcode) {

        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"users/appgetuserid/"+barcode,
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function getFavouriteList(user_id) {
        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"project/my_favourite_list/"+user_id,
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function getGroupFavouriteList(user_id) {
        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"project/group_favourite_list/"+user_id,
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function getGroupList(user_id) {
        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"project/groupList/"+user_id,
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }
      
      function getGroupUserList(user_id,group_id) {
        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"project/group_friend_list/"+user_id+"/"+group_id,
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function getFriendList(user_id) {
        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"users/friendList/"+user_id,
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function closeProject(p_id,user_id) {
        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"project/closeProject/"+p_id+"/"+user_id,
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function checkProject(p_id) {
        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"project/getProjectStatus/"+p_id,
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }
      
      function getProjectGroupUserList(p_id) {
        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"project/projectRelatedGroupUser/"+p_id,
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function delProjectUserGroup(id,is_group,p_id) {
        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"project/deleteProjectRelatedGroupUser/"+id+"/"+is_group+"/"+p_id,
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }
      function saveProject(user_id,project,project_share,project_option) {
        var encodedString = 'user_id=' + encodeURIComponent(user_id)+
          '&project=' + encodeURIComponent(project)+
          '&project_share=' + encodeURIComponent(project_share)+
          '&project_option=' + encodeURIComponent(project_option);
        var request = $http({
          method: "POST",
          url: $rootScope.serviceurl+"project/saveProject",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: encodedString
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function saveFavourite(user_id,favourite_data) {
        var encodedString = 'user_id=' + encodeURIComponent(favourite_data.id)+
          '&group_id=' + encodeURIComponent(favourite_data.id)+
          '&from_user_id=' + encodeURIComponent(user_id)+
          '&is_group=' + encodeURIComponent(favourite_data.is_group);
        var request = $http({
          method: "POST",
          url: $rootScope.serviceurl+"project/saveFavourite",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: encodedString
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }
      

      function groupUserSave(to_user_id,group_id,from_user_id) {
        var encodedString = 'user_id=' + encodeURIComponent(to_user_id)+
          '&group_id=' + encodeURIComponent(group_id)+
          '&group_owner_id=' + encodeURIComponent(from_user_id);
        var request = $http({
          method: "POST",
          url: $rootScope.serviceurl+"project/saveGroupUser",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: encodedString
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }
      

      function saveGroup(name,user_id) {
        var encodedString = 'user_id=' + encodeURIComponent(user_id)+
          '&name=' + encodeURIComponent(name);
        var request = $http({
          method: "POST",
          url: $rootScope.serviceurl+"project/saveGroup",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: encodedString
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function editGroup(name,id) {
        var encodedString = 'id=' + encodeURIComponent(id)+
          '&name=' + encodeURIComponent(name);
        var request = $http({
          method: "POST",
          url: $rootScope.serviceurl+"users/editGroup",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: encodedString
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function editProject(name,id) {
        var encodedString = 'id=' + encodeURIComponent(id)+
          '&name=' + encodeURIComponent(name);
        var request = $http({
          method: "POST",
          url: $rootScope.serviceurl+"project/editProject",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: encodedString
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function deleteGroup(id) {
        var encodedString = 'id=' + encodeURIComponent(id);
        var request = $http({
          method: "POST",
          url: $rootScope.serviceurl+"users/deleteGroup",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: encodedString
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function projectDelete(id) {
        var encodedString = 'id=' + encodeURIComponent(id);
        var request = $http({
          method: "POST",
          url: $rootScope.serviceurl+"project/deleteProject",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: encodedString
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }


      function getContactList(user_id,contatList) {
        var encodedString = 'user_id=' + encodeURIComponent(user_id)+
          '&contatList=' + encodeURIComponent(contatList);
        var request = $http({
          method: "POST",
          url: $rootScope.serviceurl+"users/getContactList",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: encodedString
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function todoVideoStatusSave(user_id,todo_id) {
        var encodedString = 'user_id=' + encodeURIComponent(user_id)+
          '&todo_id=' + encodeURIComponent(todo_id);
        var request = $http({
          method: "POST",
          url: $rootScope.serviceurl+"users/video_todo_status_update",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: encodedString          
        });
        return( request.then( handleSuccess, handleError ) );
      }
      
      function todoDeleteVideoStatus(user_id,todo_id) {
        var encodedString = 'user_id=' + encodeURIComponent(user_id)+
          '&todo_id=' + encodeURIComponent(todo_id);
        var request = $http({
          method: "POST",
          url: $rootScope.serviceurl+"users/video_todo_delete_status",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: encodedString          
        });
        return( request.then( handleSuccess, handleError ) );
      }
      
      function todoStatusSave(user_id,todo_id,is_selected) {
        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"users/saveToDoComplete/"+user_id+"/"+todo_id+"/"+is_selected,
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }


    function saveTodo(tododata) {
        var encodedString = 'name=' + encodeURIComponent(tododata.name)+
          '&to_id=' + encodeURIComponent(tododata.to_id)+
          '&from_id=' + encodeURIComponent(tododata.from_id)+
          '&prj_id=' + encodeURIComponent(tododata.prj_id)+
          '&description=' + encodeURIComponent(tododata.description)+
          '&expire_date=' + encodeURIComponent(tododata.expire_date)+
          '&is_owner=' + encodeURIComponent(tododata.is_owner)+
          '&priority=' + encodeURIComponent(tododata.priority);
        var request = $http({
          method: "POST",
          url: $rootScope.serviceurl+"users/todo_add",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: encodedString
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
    }
      
        function saveVideoTodo(tododata) {
            var encodedString = 'name=' + encodeURIComponent(tododata.name)+
              '&to_id=' + encodeURIComponent(tododata.to_id)+
              '&from_id=' + encodeURIComponent(tododata.from_id)+
              '&prj_id=' + encodeURIComponent(tododata.prj_id)+
              '&description=' + encodeURIComponent(tododata.description)+
              '&expire_date=' + encodeURIComponent(tododata.expire_date)+
              '&is_owner=' + encodeURIComponent(tododata.is_owner)+
              '&priority=' + encodeURIComponent(tododata.priority);
            var request = $http({
              method: "POST",
              url: $rootScope.serviceurl+"users/todo_add_video",
              headers: {'Content-Type': 'application/x-www-form-urlencoded'},
              data: encodedString
              //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
            });
            return( request.then( handleSuccess, handleError ) );
        }
        
        function editVideoTodo(tododata) {
            var encodedString = 'name=' + encodeURIComponent(tododata.name)+
              '&id=' + encodeURIComponent(tododata.id)+
              '&expire_date=' + encodeURIComponent(tododata.expire_date)+
              '&priority=' + encodeURIComponent(tododata.priority);
            var request = $http({
              method: "POST",
              url: $rootScope.serviceurl+"users/todo_edit_video",
              headers: {'Content-Type': 'application/x-www-form-urlencoded'},
              data: encodedString
              //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
            });
            return( request.then( handleSuccess, handleError ) );
        }
        // ---
        // PRIVATE METHODS.
        // ---

        function handleError( response ) {
          //return response
            if (! angular.isObject( response.data ) ||! response.data) {
                return( $q.reject( "An unknown error occurred." ) );
            }
            // Otherwise, use expected error message.
            return( $q.reject( response.data.msg ) );
        }

        function handleSuccess( response ) {
          //console.log(response);
            return( response.data );


        }
    }
);
