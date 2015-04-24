var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        
    },
    obtenerPosicion: function(){
        navigator.geolocation.getCurrentPosition(
        function(position){
            var str = "<b>Latitud</b>: " + position.coords.latitude + "<br />"
                    + "<b>Longitud</b>: " + position.coords.longitude;
            var result = document.getElementById('result');
            result.innerHTML = str;
        },
        function(err){
            alert("Error: " + err.message);
        });
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

        if(document.getElementById(id)){
            var parentElement = document.getElementById(id);
            var listeningElement = parentElement.querySelector('.listening');
            var receivedElement = parentElement.querySelector('.received');

            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');
        }
        
        
        $('.navmenu-nav li a').attr({
            'data-recalc' : 'false',
            'data-target' : '.navmenu',
            'data-canvas' : '.canvas',
            'data-toggle' : 'offcanvas'
        });
        
        console.log('Received Event: ' + id);
    },
    adminSound:function(id,accion){
		var audio = document.getElementById(id);
		
		switch(accion){
			case 'play':
				audio.play();
				break;
			
			case 'stop':
				audio.pause();
				audio.currentTime = 0;
				break;
		}
    },
    obtenerGCM:function(){
        var pushNotification = window.plugins.pushNotification; 
        if (device.platform == 'android' || device.platform == 'Android') { 
            alert("Register called"); 
            
            pushNotification.register(this.successHandler, this.errorHandler,{"senderID":"1001248165643","ecb":"app.onNotificationGCM","sound":"true"}); 
        } 
        else { 
            alert("Register called"); 
            pushNotification.register(this.successHandler,this.errorHandler,{"badge":"true","sound":"true","alert":"true","ecb":"app.onNotificationAPN"}); 
        }
    },
    // result contains any message sent from the plugin call 
    successHandler: function(result) { 
        alert('Callback Success! Result = '+result) 
    }, 
    errorHandler:function(error) { 
        alert(error); 
    }, 
    onNotificationGCM: function(e) { 
        switch( e.event ) 
        { 
            case 'registered': 
                if ( e.regid.length > 0 ) 
                { 
                    console.log("Regid " + e.regid); 
                    alert('registration id = '+e.regid); 
                    //Cuando se registre le pasamos el regid al input 
                    document.getElementById('regId').value = e.regid; 
                } 
            break; 

            case 'message': 
              // NOTIFICACION!!! 
              alert('message = '+e.message+' msgcnt = '+e.msgcnt); 
            break; 

            case 'error': 
              alert('GCM error = '+e.msg); 
            break; 

            default: 
              alert('An unknown GCM event has occurred'); 
              break; 
        } 
    }, 
    onNotificationAPN: function(event) { 
        var pushNotification = window.plugins.pushNotification; 
        alert("Running in JS - onNotificationAPN - Received a notification! " + event.alert); 
         
        if (event.alert) { 
            navigator.notification.alert(event.alert); 
        } 
        if (event.badge) { 
            pushNotification.setApplicationIconBadgeNumber(this.successHandler, this.errorHandler, event.badge); 
        } 
        if (event.sound) { 
            //var snd = new Media(event.sound);
            var snd = new Media('../../beep.wav');
            snd.play(); 
        } 
    },
    validar_url:function(url){
        
        var regex=/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?$/;
        return regex.test(url);
        
    },
    escanear:function(){
        cordova.plugins.barcodeScanner.scan(
            function(result){
                var cadena = "";
                if(result.cancelled!=="false"){

                    if(app.validar_url(result.text)){
                        cadena = "<a target='_blank' class='btn btn-primary' href='#' onclick='app.redirect("+result.text+");'>" +
                        "<i class='fa fa-arrow-right'></i> Ir a URL" +
                        "</a> <br />" + 
                        "<b>URL</b>: " + result.text + "<br />" +
                        "<b>Formato</b>: " + result.format;
                    }

                    else{
                        cadena = "<b>Result</b>: " + result.text + "<br />" +
                          "<b>Format</b>: " + result.format + "<br />";
                    }
                }
                else{
                    cadena = "Escaneo cancelado";
                }
                var result = document.getElementById('result');
                result.innerHTML = cadena;
                
            },
            function(err){
                alert("Error: " + err);
            }
        );
    },
    redirect: function(url){
        window.location.href = url;
        return false;
    },
    vibrar:function(){
        navigator.vibrate(3000);
    },
    light:function(){
        window.plugins.flashlight.toggle();
    },
    clickme: function(){
        var str = "<b>Device Platform</b>: " + device.platform + "<br />" +
          "<b>Device Version</b>: "  + device.version  + "<br />";
        var result = document.getElementById('result');
        result.innerHTML = str;
    },
    cerrarApp:function(){
        navigator.app.exitApp();
    },
    checkConn:function(){
        var network_state = navigator.connection.type;
        var states = {};
        states[Connection.UNKNOWN] = "Unknown connection";
        states[Connection.ETHERNET] = "Ethernet connection";
        states[Connection.WIFI] = "Wifi connection";
        states[Connection.NONE] = "No network connection";
        alert('Content-type: ' + states[network_state]);
    }
};
