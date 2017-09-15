app.service(
    "storeService",
    function( $rootScope,$http, $q,Upload,$window,$rootScope ) {
        // Return public API.
        return({
          uploadUsingUpload:uploadUsingUpload,
          getStoreList:getStoreList,
          getStoreInfo:getStoreInfo,
          getProductList:getProductList,
          getStateInfo:getStateInfo,
          getCountryInfo:getCountryInfo,
          getNearestStoreList:getNearestStoreList,
          userEdit:userEdit,
          saveRating:saveRating,
          deleteProduct:deleteProduct,
          getBarcodeInfo:getBarcodeInfo,
          getMenuList:getMenuList,
          getMenuDropdownList:getMenuDropdownList,
          menuSave:menuSave,
          getAttributeList:getAttributeList,
          saveAttribute:saveAttribute,
          saveItem:saveItem,
          deleteAttribute:deleteAttribute,
          deleteItem:deleteItem,
          nearestStoreListWithoutLat:nearestStoreListWithoutLat,
          getMenuProductList:getMenuProductList,
          getStoreInfoRating:getStoreInfoRating,
          deleteMenu:deleteMenu,
          getNearestStoreListAll:getNearestStoreListAll,
          nearestStoreListWithoutLatAll:nearestStoreListWithoutLatAll
        });
        // ---
        // PUBLIC METHODS.
        // ---
	 function getBarcodeInfo(barcode_text) {
        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"store/appgetstoreid/"+barcode_text,
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }

     function uploadUsingUpload(storelist) 
     {
        var store_id=1;
        var user_id = 12;
        console.log(storelist);
        //return false;
        if(storelist.store_id != ''){
          var apicall = 'appstoreedit';
        }else{
          var apicall = 'appstoreadd';
        }
        var request = Upload.upload({
          method: "POST",
          url: $rootScope.serviceurl+"store/"+apicall,
          async:true,
          crossDomain:true,
          data: storelist,
          //headers: {'Content-Type': 'application/x-www-form-urlencoded'},

          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        }).success(function (response) {
          console.log(response);
        }).error(function () {
          console.log(1234);
        });
        return( request.then( handleSuccess, handleError ) );
     }


      function getStoreList(user_id) {

        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"store/appmystorelist/"+user_id,
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function getNearestStoreList(lat,lang,type,cat) {

        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"store/appnearestStoreList/"+lat+"/"+lang+"/"+type+"/"+cat,
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function nearestStoreListWithoutLat(type,cat) {

        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"store/nearestStoreListWithoutLat/"+type+"/"+cat,
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function getNearestStoreListAll(lat,lang,type,cat) {

        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"store/nearestStoreListAll/"+lat+"/"+lang+"/"+type+"/"+cat,
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function nearestStoreListWithoutLatAll(type,cat) {

        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"store/nearestStoreListWithoutLatAll/"+type+"/"+cat,
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }


      function getStateInfo(country_id) {

        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"state/appstatelist/"+country_id,
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function getCountryInfo() {

        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"state/appcountrylist",
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function saveRating(rating,store_id,user_id) {
        var encodedString = 'rating=' + encodeURIComponent(rating.rate)+
          '&review=' + encodeURIComponent(rating.review)+
          '&store_id=' + encodeURIComponent(store_id)+
          '&user_id=' + encodeURIComponent(user_id);
        var request = $http({
          method: "POST",
          url: $rootScope.serviceurl+"store/saveRating",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data:encodedString,
          // headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function getStoreInfo(store_id,lat,lang) {

        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"store/appstoredetails/"+store_id+"/"+lat+"/"+lang,
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function getStoreInfoRating(store_id) {
        var lat ='';
        var lang='';
        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"store/storeDetailsRating/"+store_id,
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function getProductList(store_id) {

        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"product/appproductlist/"+store_id+"/0",
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }
      
      function getMenuProductList(store_id,menu_id) {

        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"product/appproductlist/"+store_id+"/"+menu_id,
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }

      /*function userEdit(item) {
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
      }*/

      function userEdit(item) {
        //var store_id=1;
        //var user_id = 12;
        console.log(item);

        var request = Upload.upload({
          method: "POST",
          url: $rootScope.serviceurl+"users/edit_profile",
          async:true,
          crossDomain:true,
          data: item,
          //headers: {'Content-Type': 'application/x-www-form-urlencoded'},

          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        }).success(function (response) {
          console.log(response);
        }).error(function () {
          console.log(1234);
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function deleteProduct(id,store_id) {
        var encodedString = 'store_id=' + encodeURIComponent(store_id)+
          '&id=' + encodeURIComponent(id);
        var request = $http({
          method: "POST",
          url: $rootScope.serviceurl+"product/productdelete",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: encodedString
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function getMenuList(store_id) {

        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"store/storeRelatedMenu/"+store_id,
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function getMenuDropdownList(store_id) {

        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"store/storeRelatedMenuDropdown/"+store_id,
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function menuSave(storedetails) {
        var encodedString = 'store_id=' + encodeURIComponent(storedetails.store_id)+
          '&user_id=' + encodeURIComponent(storedetails.user_id)+
          '&menu_id=' + encodeURIComponent(storedetails.menu_id)+
          '&menu_name=' + encodeURIComponent(storedetails.menu_name);
        var request = $http({
          method: "POST",
          url: $rootScope.serviceurl+"store/saveStoreMenu",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: encodedString
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function getAttributeList(product_id,user_id) {

        var request = $http({
          method: "GET",
          url: $rootScope.serviceurl+"store/allattributelist/"+product_id+"/"+user_id,
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function saveAttribute(attribute) {
        var encodedString = 'product_id=' + encodeURIComponent(attribute.product_id)+
          '&user_id=' + encodeURIComponent(attribute.user_id)+
          '&isrequired=' + encodeURIComponent(attribute.isrequired)+
          '&isradio=' + encodeURIComponent(attribute.isradio)+
          '&attribute_name=' + encodeURIComponent(attribute.attribute_name);
        var request = $http({
          method: "POST",
          url: $rootScope.serviceurl+"store/saveAttribute",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: encodedString
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function saveItem(item) {
        var encodedString = 'product_id=' + encodeURIComponent(item.product_id)+
          '&user_id=' + encodeURIComponent(item.user_id)+
          '&attribute_id=' + encodeURIComponent(item.attribute_id)+
          '&item_name=' + encodeURIComponent(item.item_name)+
          '&item_price=' + encodeURIComponent(item.item_price);
        var request = $http({
          method: "POST",
          url: $rootScope.serviceurl+"store/saveItem",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: encodedString
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }


      function deleteAttribute(id,product_id,user_id) {
        var encodedString = 'product_id=' + encodeURIComponent(product_id)+
          '&user_id=' + encodeURIComponent(user_id)+
          '&attribute_id=' + encodeURIComponent(id);
        var request = $http({
          method: "POST",
          url: $rootScope.serviceurl+"store/deleteAttribute",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: encodedString
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function deleteItem(id,product_id,user_id) {
        var encodedString = 'product_id=' + encodeURIComponent(product_id)+
          '&user_id=' + encodeURIComponent(user_id)+
          '&item_id=' + encodeURIComponent(id);
        var request = $http({
          method: "POST",
          url: $rootScope.serviceurl+"store/deleteItem",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: encodedString
          //headers: { 'Content-Type': 'application/json','accesstoken':accesstoken}
        });
        return( request.then( handleSuccess, handleError ) );
      }

      function deleteMenu(id) {
        var encodedString = 'id=' + encodeURIComponent(id);
        var request = $http({
          method: "POST",
          url: $rootScope.serviceurl+"store/deleteMenu",
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
