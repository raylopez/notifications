angular.module('AppNotification')
	.controller('MainCtrl',function($scope){
		$scope.nombre = 'Eric';
		$scope.titulo = "Inicio";
	})
	.controller('AboutCtrl',function($scope){
		$scope.titulo = "Nosotros";
	})
	.controller('GalleryCtrl',function($scope){
		$scope.titulo = "Galería";
	})
	.controller('ContactCtrl',function($scope,$http){
		$scope.titulo = "Contacto Notificationes";
		$scope.posts = {};
		$scope.latitud = "";
		$scope.longitud = "";
		$scope.datos = [];

		$scope.obtenerPosicion = function(){
			navigator.geolocation.getCurrentPosition(
		        function(position){
		            $scope.latitud = position.coords.latitude;
		            $scope.longitud = position.coords.longitude;
		            
		            var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng="+$scope.latitud+","+$scope.longitud+"&sensor=true_or_false";
		            $http.get(url)
		            	.success(function(data){
		            		var dates = data.results[0].address_components;
		            		for (var i = 0; i < dates.length; i++) {
		            			$scope.datos.push(dates[i]);
		            		};
		            	})
		            	.error(function(err){
		            		console.log(err);
		            	}
		            );
		        },
		        function(err){
		            alert("Error: " + err.message);
		        }
		     );
		};

		/*
		$http.get('http://jsonplaceholder.typicode.com/posts')
		.success(function(data){
			$scope.posts = data;
		})
		.error(function(){

		});*/
	})
	.controller('FormCtrl',function($scope){
		$scope.titulo = "Formulario";
	})
	.controller('QRCtrl',function($scope){
		$scope.titulo = "Escaner QR";
	})
	.controller('FlashlightCtrl',function($scope){
		$scope.titulo = "Linterna";
	});