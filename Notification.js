  document.addEventListener("deviceready", onDeviceReady, true);

    var pushNotification;

     function onDeviceReady() {
			
		
         
         pushNotification = window.plugins.pushNotification;
         
         alert(device.platform);
         
         if ( device.platform == 'android' || device.platform == 'Android' )
                    {
                      
                        pushNotification.register(
                            successHandler,
                            errorHandler, {
                                "senderID":"409868959211",
                                "ecb":"onNotificationGCM"
                            });
                        
                    }
            else
                {
                    
                        
                        pushNotification.register(
                            tokenHandler,
                            errorHandler, {
                                "badge":"true",
                                "sound":"true",
                                "alert":"true",
                                "ecb":"onNotificationAPN"
                            });
                }
         
        
        } 


        function successHandler (result) 
            {
                
            alert('result = ' + result);
                
            }

        function errorHandler (error)
            {
            alert('error = ' + error);
             }


//Android push notification handler
   onNotificationGCM: function(e) {
        switch( e.event )
        {
            case 'registered':
                if ( e.regid.length > 0 )
                {
                    console.log("Regid " + e.regid);
                    alert('registration id = '+e.regid);
                }
            break;
 
            case 'message':
              // this is the actual push notification. its format depends on the data model from the push server
              alert('message = '+e.message+' msgcnt = '+e.msgcnt);
            break;
 
            case 'error':
              alert('GCM error = '+e.msg);
            break;
 
            default:
              alert('An unknown GCM event has occurred');
              break;
        }
    }


    function IsDeviceRegResponseSuccess(result)
        {

          
            var resMessage = result.ApiResponse.Message;            
           alert(result.ApiResponse.Message);
            if(resMessage == "Success")
                {
                   
                       alert(result.ApiResponse.Message);

                }


        }

    function errorfunction()
        {

                alert(1233);

        }


// iOS
        function successHandler(result)
        {
            alert('result = ' + result);
        }
    function tokenHandler (result) 
        {
        // Your iOS push server needs to know the token before it can push to this device
        // here is where you might want to send it the token for later use.
        alert('device token = ' + result);
            
            var reqData ={"AppType":"1","DeviceId":""+result+"","IPAddress":"","UserId":"0"};
            ajaxcall("UpdateUserDetailsAndFetchDefaultCountry",reqData,IsDeviceRegResponseSuccess,errorfunction);
//            
        }
    function onNotificationAPN (event)
        {
            if ( event.alert )
                {
                navigator.notification.alert(event.alert);
                }

            if ( event.sound )
                {
                var snd = new Media(event.sound);
                snd.play();
                }

            if ( event.badge )
                {
                pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
                }
        }