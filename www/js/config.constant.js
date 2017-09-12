// Ionic Starter App
var app = angular.module('starter');
app.constant('JS_REQUIRES', {
    //*** Scripts
    scripts: {
        //******frontend style******//
        //*** Controllers
        'login': ['js/controllers/SigninCtrl.js'],
        'projectlisting': ['js/controllers/ProjectListingCtrl.js','js/directives/sglclickDirective.js'],
        'userprofile': ['js/controllers/UserProfileCtrl.js','js/services/storeService.js'],
        'projectmanage': ['js/controllers/ProjectManageCtrl.js'],
        'usertmplt': ['js/controllers/UserTemplateCtrl.js'],
        'signup': ['js/controllers/SignupCtrl.js'],
        'projectdetail':['js/controllers/projectDetailCtrl.js'],
        'alertlisting':['js/controllers/AlertCtrl.js'],
        'alertaccept':['js/controllers/AlertAcceptCtrl.js'],
        'addtodo':['js/controllers/todoAddCtrl.js'],
        'userprojectdetail':['js/controllers/userProjectDetailCtrl.js'],
        'useraddtodo':['js/controllers/userTodoAddCtrl.js'],
        'chat':['js/controllers/ChatCtrl.js'],
        'chatlist':['js/controllers/ChatListCtrl.js'],
        'groupadd':['js/controllers/GroupCtrl.js'],
        'projectedit':['js/controllers/ProjectEditCtrl.js'],
        'groupchat':['js/controllers/GroupChatCtrl.js'],
        'tododetail':['js/controllers/userToDoDetailCtrl.js'],
        'projectgroup':['js/controllers/ProjectGroupCtrl.js'],
        'to_do_list':['js/controllers/ToDoListCtrl.js'],
        'update_project':['js/controllers/ProjectUpdateCtrl.js'],
        'videoproject_ownerchat':['js/controllers/videoProjectChatOwnerCtrl.js'],
        'videoproject_chat':['js/controllers/videoProjectChatCtrl.js'],
        'edittodo':['js/controllers/TodoEditCtrl.js']
        
        //*** Services
    },
  modules: [
    {
      name: 'ngSanitize',
      files: ['js/dependency/angular-sanitize.js']
    },
    {
      name: 'ngFileUpload',
      files: ['js/dependency/ng-file-upload-shim.min.js','js/dependency/ng-file-upload.min.js']
    },
    {
      name: 'ngMap',
      files: ['js/dependency/ng-map.min.js','http://maps.google.com/maps/api/js?libraries=placeses,visualization,drawing,geometry,places']
    },
    {
      name: 'ionic.rating',
      files: ['js/dependency/ionic-rating.min.js','css/ionic-rating.css']
    }
  ]
});


