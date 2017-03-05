//这里统一管理service(服务)
angular.module('myApp')
	
	//获取食物信息的服务
	.factory('FoodService', ['$http', function ($http) {
		return {
			getFoodList : function () {
				return $http.get('./json/detail.json');
			}
		}	
	}])
	.factory('cartService', [function () {
		var dataArr = [];
		return {
			getCartData : function () {
				return dataArr;
			}
		}
	}])


