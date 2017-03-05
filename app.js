//主入口文件
//依赖于路由和css两个模块
angular.module('myApp', ['ngRoute', 'angularCSS'])
//run方法，是在模块加载的时候初始化一些功能，
	.run(['$window', '$rootScope', function ($window, $rootScope) {
//		$window相当于原生的window对象
//		$rootScope 全局作用域，用于存储全局变量，在任何地方都可以使用
//		$rootScope.$on 可以监听一些事件，在这里监听的是浏览器地址的变化
		//$locationChangeSuccess 浏览器地址变化成功后处理的逻辑
		$rootScope.$on('$locationChangeSuccess', function () {
			//如果浏览器地址包含eat那么就隐藏footer
			if (($window.location.href.indexOf('detail') != -1) || ($window.location.href.indexOf('eat') != -1 ) || ($window.location.href.indexOf('detail_cart') != -1 ) ) {
				$rootScope.rootIsFooterShow = false;
			} else {
				$rootScope.rootIsFooterShow = true;
			}
			if ($window.location.href.indexOf('detail_cart') != -1) {
				$rootScope.rootIsFooterShow = true;
			} 
		})
	}])
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/home', {
			templateUrl : './view/home.html',
			controller : 'HomeCtrl as homeCtrl'
		})
		.when('/classify', {
			templateUrl : './view/classify.html',
			controller : 'ClassifyCtrl as classifyCtrl'
		})
		.when('/eat', {
			templateUrl : './view/eat.html',
			controller : 'EatCtrl as eatCtrl'
		})
		.when('/cart', {
			templateUrl : './view/cart.html',
			controller : 'CartCtrl as cartCtrl'
		})
		.when('/mine', {
			templateUrl : './view/mine.html',
			controller : 'MineCtrl as mineCtrl'
		})
		.when('/detail/:CommodityId', {
			templateUrl : './view/detail.html',
			controller : 'DetailCtrl as detailCtrl'
		})
		.when('/detail_cart', {
			templateUrl : './view/detail_cart.html',
			controller : 'Detail_cartCtrl as detail_cartCtrl'
		})
		
		.otherwise({
			redirectTo : '/home'
		})
	}])
