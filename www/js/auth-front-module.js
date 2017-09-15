angular
.module("authFront", [])
.factory("myAuth", function ($http, $window, $location) {
  var factobj = {};



    /*********************************User Authorisation ***********************************/
    factobj.userinfo = { loginstatus: false, id: "", email: "",name:"",user_type:"",is_active:"",device_type:"",device_token_id:"",image_url:"" };
    factobj.updateUserinfo = function (obj) {

      console.log(obj);
      //return false;
    if(obj && obj != 'null')
	{
    obj = (JSON.parse(obj));

           /*if(obj.imgtype==1){
           	if(obj.image=='')
           	{
           		obj.image = factobj.baseurl+'assets/upload/user_images/noimage.png';
           	}else{
                        var pat = /^((http|https|ftp):\/\/)/;
                        if(pat.test(obj.image))
                        {
                            obj.image = obj.image;
                        }
                        else
                        {
                            obj.image = factobj.baseurl+'assets/upload/user_images'+obj.image;
                        }
                        if(obj.credit_tokens==undefined || obj.credit_tokens=='')
                        {
                        	obj.credit_tokens=0;
                        }
           	}
           }*/
           factobj.userinfo = { loginstatus:true, id: obj.id, email: obj.email,name:obj.name,is_active:obj.is_active,user_type:obj.user_type,device_type:obj.device_type,device_token_id:obj.device_token_id,image_url:obj.image_url};
           return true;
	}else{
      factobj.userinfo = { loginstatus: false, id: "", email: "",name:"",user_type:"",is_active:"",device_type:"",device_token_id:"",image_url:"" };

      return true;
    }
    };
    factobj.resetUserinfo = function () {
      factobj.userinfo = { loginstatus: false, id: "", email: "",name:"",user_type:"",is_active:"",device_type:"",device_token_id:"",image_url:"" };
    };

    factobj.getUserAuthorisation = function () {
       //var obj=$cookieStore.get('users');
        var obj=localStorage.getItem('users');
        //console.log(obj);
       if(obj)
       {
       	/*if(obj.credit_tokens==undefined || obj.credit_tokens=='')
                        {
                        	obj.credit_tokens=0;
                        }*/
       	return obj;
       }
       else
       {
       	return null;
       }
    };

    factobj.getUserNavlinks = function () {
        //var userlogin = factobj.userinfo.loginstatus,
      var userlogin = JSON.parse(localStorage.getItem('users'));

        if (!userlogin) {
           return false;
        } else {
	    //return factobj.userinfo;
          console.log(userlogin);
          return userlogin;
        }
    };

    factobj.isUserLoggedIn = function () {
        var userlogin = factobj.userinfo.loginstatus;
        if (!userlogin) {
            return false;
        } else {
	    return true;
        }
    };

    /*********************************User Authorisation End***********************************/



    return factobj;

})
