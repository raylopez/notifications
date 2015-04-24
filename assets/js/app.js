angular.module('AppNotification',['ngRoute'])
	.config(function($routeProvider){
		$routeProvider
			.when('/',{
				controller : 'MainCtrl',
				templateUrl : 'templates/home.html'
			})
			.when('/about',{
				controller : 'AboutCtrl',
				templateUrl : 'templates/about.html'
			})
			.when('/gallery',{
				controller : 'GalleryCtrl',
				templateUrl : 'templates/gallery.html'
			})
			.when('/contact',{
				controller : 'ContactCtrl',
				templateUrl : 'templates/contact.html'
			})
			.when('/qr',{
				controller : 'QRCtrl',
				templateUrl : 'templates/qr.html'
			})
			.when('/form',{
				controller : 'FormCtrl',
				templateUrl : 'templates/form.html'
			})
			.when('/flashlight',{
				controller : 'FlashlightCtrl',
				templateUrl : 'templates/flashlight.html'
			})
	});