// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ionic-material','authFront','oc.lazyLoad','ngCordova']);

app.run(function ($ionicPlatform,$cordovaPushV5,$rootScope,$state) {	
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        var options = {
          android: {
            senderID: "201139529475"
          },
          ios: {
            senderID: "201139529475",
            alert: "true",
            badge: "true",
            sound: "true"
          },
          windows: {}
        };
        
        // initialize
        $cordovaPushV5.initialize(options).then(function() {
          // start listening for new notifications
          console.log('start');
          $cordovaPushV5.onNotification();
          // start listening for errors
          $cordovaPushV5.onError();
          
          // register to get registrationId
          $cordovaPushV5.register().then(function(registrationId) {
            // save `registrationId` somewhere;
            //console.log(registrationId);
             $rootScope.uuid = registrationId;
             var deviceInformation = ionic.Platform.device();
              //console.log(deviceInformation);
              $rootScope.deviceType = deviceInformation.platform.toLowerCase();
          })
        });

        $rootScope.$on('$cordovaPushV5:notificationReceived', function(event, data){
          // data.message,
          // data.title,
          // data.count,
          // data.sound,
          // data.image,
          // data.additionalData
          //$state.go();
          console.log(data);
            if(data.additionalData.encoded.type =='chat'){
                $state.go('user.chat',{id:data.additionalData.encoded.id})
            }else if(data.additionalData.encoded.type == 'groupchat'){
                $state.go('user.groupchat',{id:data.additionalData.encoded.id})
            }else{
                $state.go('user.alert');
            }
        });

        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});

app.run(['$rootScope', '$state', '$stateParams',
  function ($rootScope, $state, $stateParams,myAuth) {
    // Attach Fastclick for eliminating the 300ms delay between a physical tap and the firing of a click event on mobile browsers
    // FastClick.attach(document.body);

    // Set some reference to access them from any scope
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    // GLOBAL APP SCOPE

    //$rootScope.serviceurl = "http://getgo-app.com/getgo/getGoAPI/";
    //$rootScope.serviceurl = "http://getgo-app.com/getgo/getGoAPI/";
    $rootScope.serviceurl = "http://111.93.169.90/team2/project_management/projectMngmtAPI/";
         //$rootScope.stripe_publish_key = "pk_test_avhCsvHAaou7xWu7SxVCzptC";
         //$rootScope.stripe_publish_key = "pk_test_a666FKcWDKrfw2xVcLDuUqdj";
          $rootScope.stripe_publish_key = "";
  }]);

app.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', 'JS_REQUIRES',
  function ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, jsRequires,$authProvider,$locationProvider) {
    app.controller = $controllerProvider.register;
    app.directive = $compileProvider.directive;
    app.filter = $filterProvider.register;
    app.factory = $provide.factory;
    app.service = $provide.service;
    app.constant = $provide.constant;
    app.value = $provide.value;

    // LAZY MODULES
    $ocLazyLoadProvider.config({
      debug: false,
      events: true,
      modules: jsRequires.modules
    });
    $stateProvider

    .state('splash', {
	    url: '/splash',
	    templateUrl: 'templates/splash.html',
	    //controller: 'LoginCtrl'
	    
	  })
	  
    .state('login', {
      url: '/',
      cache : false,
      abstract:true,
      templateUrl: 'templates/basetemplate/logintemplate.html'
    })
  	  .state('user', {
      url: '/',
      cache : false,
      abstract:true,
      resolve: loadSequence('usertmplt'),
      templateUrl: 'templates/basetemplate/usertemplate.html',
      controller: 'UserTemplateCtrl'
    })



// with parent homeview
.state('login.sign_in', {
    url: 'signin',
    cache : false,
    views: {
        'signinview': {
            templateUrl: 'templates/sign_in.html',
            resolve: loadSequence('login'),
            controller: 'SigninCtrl'
        }
    }
  })
.state('register', {
      url: '/register',
      cache : false,
      /*views: {
        'signinview': {
            templateUrl: 'templates/register.html',
            resolve: loadSequence('signup'),
            controller: 'SignupCtrl'
        }
    }*/
      templateUrl: 'templates/register.html',
      resolve: loadSequence('signup'),
      controller: 'SignupCtrl'
      
    })
.state('user.home', {
    url: 'home',
    cache : false,
    views: {
        'homeview': {
            templateUrl: 'templates/home.html',
            resolve: loadSequence('projectlisting'),
            controller: 'ProjectListingCtrl'
        }
    }
  })

.state('user.projects', {
    url: 'projects',
    cache : false,
    views: {
        'homeview': {
            templateUrl: 'templates/home.html',
            resolve: loadSequence('projectlisting'),
            controller: 'ProjectListingCtrl'
        }
    }
  })

.state('user.groups', {
    url: 'groups',
    cache : false,
    views: {
        'homeview': {
            templateUrl: 'templates/groups.html',
            resolve: loadSequence('groupadd'),
            controller: 'GroupCtrl'
        }
    }
  })
  .state('user.addusergroup', {
      url: 'addusergroup',
      cache : false,
      views: {
          'homeview': {
              templateUrl: 'templates/project_groups.html',
              resolve: loadSequence('projectgroup'),
              controller: 'ProjectGroupCtrl'
          }
      }
    })
    .state('user.add_job', {
        url: 'add_job',
        cache: false,
        views: {
        'homeview': {
            templateUrl: 'templates/add_job.html',
            resolve: loadSequence('projectmanage','ngMap','ngSanitize'),
            controller: 'ProjectManageCtrl'
        }
    }
	    
	  })
    .state('user.displayvideo', {
      url: 'displayvideo',
      cache : false,
      views: {
          'homeview': {
              templateUrl: 'templates/display_video.html',
              //resolve: loadSequence('projectmanage'),
              resolve: loadSequence('projectmanage','ngMap','ngSanitize'),
              controller: 'ProjectManageCtrl'
          }
      }
    })
.state('user.project-edit', {
    url: 'project-edit/:id',
    cache : false,
    views: {
        'homeview': {
            templateUrl: 'templates/project-edit_b.html',
            resolve: loadSequence('projectedit'),
            controller: 'ProjectEditCtrl'
        }
    }
  })

.state('user.update_project', {
    url: 'update_project/:id/:name',
    cache : false,
    views: {
        'homeview': {
            templateUrl: 'templates/update_project.html',
            resolve: loadSequence('update_project'),
            controller: 'ProjectUpdateCtrl'
        }
    }
  })
/*.state('project-edit_b', {
     url: '/project-edit_b',
     templateUrl: 'templates/project-edit_b.html',
     controller: 'SigninCtrl'
     
   })

 .state('groups', {
     url: '/groups',
     templateUrl: 'templates/groups.html',
     controller: 'ComponentsCtrl'
     
   })*/


.state('user.chat', {
      url: 'chat/:id',
      cache: false,
      views: {
        'homeview': {
            templateUrl: 'templates/chat.html',
            resolve: loadSequence('chat'),
            controller: 'ChatCtrl'
        }
    }
      
    })
.state('user.groupchat', {
      url: 'groupchat/:id',
      cache: false,
      views: {
        'homeview': {
            templateUrl: 'templates/groupchat.html',
            resolve: loadSequence('groupchat'),
            controller: 'GroupChatCtrl'
        }
    }
      
    })
.state('user.chatlist', {
      url: 'chatlist',
      cache: false,
      views: {
        'homeview': {
            templateUrl: 'templates/chat_list.html',
            resolve: loadSequence('chatlist'),
            controller: 'ChatListCtrl'
        }
    }
      
    })

.state('user.details', {
    url: 'details',
    cache : false,
    views: {
        'homeview': {
            templateUrl: 'templates/details.html',
            resolve: loadSequence('userprofile','ngFileUpload'),
            controller: 'UserProfileCtrl'
        }
    }	    
})

.state('user.home_details', {
      url: 'home_details/:id',
      cache : false,
      views: {
        'homeview': {
            templateUrl: 'templates/home_details.html',
            resolve: loadSequence('projectdetail','ngSanitize'),
            controller: 'projectDetailCtrl'
        }
    }
    //templateUrl: 'templates/home_details.html',
    //controller: 'ComponentsCtrl'
      
    })
    
    .state('user.video_home_details', {
      url: 'video_home_details/:id',
      cache : false,
      views: {
        'homeview': {
            templateUrl: 'templates/video_home_details.html',
            resolve: loadSequence('projectdetail','ngSanitize'),
            controller: 'projectDetailCtrl'
        }
    }
    })
    
    .state('user.todo_videochat_owner', {
      url: 'todo_videochat_owner/:id',
      cache : false,
      views: {
        'homeview': {
            templateUrl: 'templates/owner_video_chat.html',
            resolve: loadSequence('videoproject_ownerchat','ngSanitize'),
            controller: 'videoProjectChatOwnerCtrl'
        }
    }
    })
    
    .state('user.todo_videochat', {
      url: 'todo_videochat/:id',
      cache : false,
      views: {
        'homeview': {
            templateUrl: 'templates/video_chat.html',
            resolve: loadSequence('videoproject_chat','ngSanitize'),
            controller: 'videoProjectChatCtrl'
        }
    }
    })
    
  .state('user.user_project_details', {
      url: 'user_project_details/:id/:user_id',
      cache : false,
      views: {
        'homeview': {
            templateUrl: 'templates/user_project_details.html',
            resolve: loadSequence('userprojectdetail','ngSanitize'),
            controller: 'userProjectDetailCtrl'
        }
    }
    //templateUrl: 'templates/home_details.html',
    //controller: 'ComponentsCtrl'
      
    })

    .state('user.user_videoproject_details', {
      url: 'user_videoproject_details/:id/:user_id',
      cache : false,
      views: {
        'homeview': {
            templateUrl: 'templates/user_videoproject_details.html',
            resolve: loadSequence('userprojectdetail','ngSanitize'),
            controller: 'userProjectDetailCtrl'
        }
    }
    })

  .state('user.to_do_detail', {
      url: 'to_do_detail/:id',
      cache : false,
      views: {
        'homeview': {
            templateUrl: 'templates/to_do_detail.html',
            resolve: loadSequence('tododetail'),
            controller: 'userToDoDetailCtrl'
        }
    }
    
    })
    
    .state('user.video_todo_detail', {
      url: 'video_todo_detail/:id',
      cache : false,
      views: {
        'homeview': {
            templateUrl: 'templates/video_todo_detail.html',
            resolve: loadSequence('tododetail'),
            controller: 'userToDoDetailCtrl'
        }
    }
    
    })
    
    .state('user.alert', {
      url: 'alert',
      cache : false,
      views: {
        'homeview': {
            templateUrl: 'templates/alert.html',
            resolve: loadSequence('alertlisting'),
            controller: 'AlertCtrl'
        }
      }
      //templateUrl: 'templates/alert.html',
      //controller: 'ComponentsCtrl'
      
    })
    .state('user.add_details', {
      url: 'add_details/:id',
      cache : false,
      views: {
        'homeview': {
            templateUrl: 'templates/add_details.html',
            resolve: loadSequence('addtodo'),
            controller: 'todoAddCtrl'
        }
      }
      //templateUrl: 'templates/add_details.html',
      //controller: 'ComponentsCtrl'
      
    })

    .state('user.todo_edit', {
      url: 'todo_edit/:id/:tid',
      cache : false,
      views: {
        'homeview': {
            templateUrl: 'templates/todo_edit.html',
            resolve: loadSequence('edittodo'),
            controller: 'TodoEditCtrl'
        }
      }
    })

    .state('user.user_add_todo', {
      url: 'user_add_todo/:id/:user_id',
      cache : false,
      views: {
        'homeview': {
            templateUrl: 'templates/add_todo_user.html',
            resolve: loadSequence('useraddtodo'),
            controller: 'userTodoAddCtrl'
        }
      }
      //templateUrl: 'templates/add_details.html',
      //controller: 'ComponentsCtrl'
      
    })

    .state('user.alert_info', {
      url: 'alert_info/:id/:pid/:uid',
      cache : false,
      views: {
        'homeview': {
            templateUrl: 'templates/alert2.html',
            resolve: loadSequence('alertaccept','ngSanitize'),
            controller: 'AlertAcceptCtrl'
        }
      }      
      
    })

    .state('user.to_do_list', {
      url: 'to_do_list',
      cache : false,
      views: {
        'homeview': {
            templateUrl: 'templates/to_do_list.html',
            resolve: loadSequence('to_do_list'),
            controller: 'ToDoListCtrl'
        }
    }  
      
    })	
	 
    
    .state('sign_in', {
	    url: '/',
      cache : false,
	    templateUrl: 'templates/sign_in.html',
      resolve: loadSequence('login'),
	    controller: 'SigninCtrl'
	    
	  })
	  
	  .state('forget_password', {
	    url: '/forget_password',
      cache : false,
	    templateUrl: 'templates/forget_password.html',
      resolve: loadSequence('login'),
	    controller: 'SigninCtrl'
	    
	  })
	  
	  
    /*.state('register', {
	    url: '/register',
	    templateUrl: 'templates/register.html',
	    controller: 'ComponentsCtrl'
	    
	  })*/
	  
	  .state('notification-driver', {
	    url: '/notification-driver',
      cache : false,
	    templateUrl: 'templates/4-driver.html',
	    controller: 'NotificationCtrl'
	    
	  })
	  
	  
	   
	   
	  
	   .state('edit_profile', {
	    url: '/edit_profile',
      cache : false,
	    templateUrl: 'templates/edit_profile.html',
	    controller: 'ComponentsCtrl'
	    
	  })
     
	   /*.state('detailss', {
	    url: '/detailss',
	    templateUrl: 'templates/details.html',
	    controller: 'ComponentsCtrl'
	    
	  })*/
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');
  function loadSequence() {
    var _args = arguments;
    return {
      deps: ['$ocLazyLoad', '$q',
        function ($ocLL, $q) {
          var promise = $q.when(1);
          for (var i = 0, len = _args.length; i < len; i++) {
            promise = promiseThen(_args[i]);
          }
          return promise;

          function promiseThen(_arg) {
            if (typeof _arg == 'function')
              return promise.then(_arg);
            else
              return promise.then(function () {
                var nowLoad = requiredData(_arg);
                if (!nowLoad)
                  return $.error('Route resolve: Bad resource name [' + _arg + ']');
                return $ocLL.load(nowLoad);
              });
          }

          function requiredData(name) {
            if (jsRequires.modules)
              for (var m in jsRequires.modules)
                if (jsRequires.modules[m].name && jsRequires.modules[m].name === name)
                  return jsRequires.modules[m];
            return jsRequires.scripts && jsRequires.scripts[name];
          }
        }]
    };
  }
}]);






