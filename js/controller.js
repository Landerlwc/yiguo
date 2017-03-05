//注意：这里angular.module('myApp') 第二个
//参数依赖去掉
angular.module('myApp')
	//依赖注入$css(这个是angularCSS这个插件中的服务)
	.controller('HomeCtrl', ['$css','$http', '$timeout','$location', function ($css, $http, $timeout, $location) {
		$css.add('./css/home.css');
		var self = this;
		self.homeSearch = function () {
			$location.path('classify');
		}
		$http.get('json/home.json')
		.success(function (result) {
			//轮播图
			var common = result.data.template.componentList,
				 carouselPictures = common[0].carouselPictures,
					nav = common[0].componentNavs,
					main_divData = [],
					main_footer = [];
			self.list = function () {return carouselPictures;};
			self.nav = function () {return nav;};
			self.hotSale = function () {return common[1].adPictures[0].pictureUrl};
			self.hotSale_pictureUrl = function () {return common[2].adPictures};
			
			for (var i = 0; i < common.length; i++) {
					(i>=3 && i<=8) && main_divData.push(common[i])
				}
			for (var i = 0; i < common.length; i++) {
					(i>=9 && i<=14) && main_footer.push(common[i])
				}
			
			self.main_div = main_divData;
			self.main_footer = main_footer;
		
			//易果生鲜
			self.fresh_app = function () {return common[15].adPictures[0].pictureUrl}
		})
		.error(function (errorStr) {
			console.log(errorStr)
		})
//		var myScroll;
//		$(function () {
//			myScroll = new IScroll('#wrapper', { 
//  		mouseWheel: true,
//           click: true,
//           eventPassthrough: true,//纵向滚动整个页面，横向滚动iscroll区域
////           scrollX:true,//默认是纵向，横向需要设置scrollX
//           });
//		})
		$timeout(function () {
				var swiper = new Swiper(".home>.swiper-container", {
					pagination:".swiper_pagination",
					autoplay:1000,
					autoplayDisabledOnInteraction:false,
					loop : true,
					observer:true,//修改swiper自己或子元素时，自动初始化swiper
					observeParents:true//修改swiper的父元素时，自动初始化swiper
				})
				
//				var swiper = new Swiper(".main_div .swiper-container",{
//					pagination:".swiper_pagination",
//					autoplayDisabledOnInteraction:false,
//					loop : true,
//					observer:true,//修改swiper自己或子元素时，自动初始化swiper
//					observeParents:true//修改swiper的父元素时，自动初始化swiper
//			})
		}, 500);
	
	
		self.freshAppIconClose = function () {
			$("#home>#fresh_app").hide();
		}
	}])
	.controller('ClassifyCtrl', ['$css', '$http', function ($css, $http) {
		var self = this;
		$css.add('./css/classify.css');
//		self.flag = true;
		$('.classify_foodList').on('click', '.classify_foodList_bigBox', function () {
//				$(this).children('.classify_foodList_ul').show().parent().siblings().find('.classify_foodList_ul').hide();
			$(this).find('.classify_foodList_ul').toggle();
			$(this).find('.classify_foodList_span').toggle();
			$(this).children('.classify_foodList_ul').parent().siblings().find('.classify_foodList_ul').hide();
			
		})
		
		$http.get('./json/classify.json')
			.success(function (result) {
				var data = result.RspData.data;
				self.foodList = function () {
					return data;
				}
			})
			.error(function (errorStr) {
				console.log(errorStr)
			})
		self.classify_top_search = function () {
			$('.classify_top>span').html("消失");
		}
		self.search_show = function () {
			if($('.classify_top_input').val() == "") {
				$('#classify .search_test').show(300).css("background-color","white");
				$('#classify').css("background-color","lightgray")
			} else {
				$('#classify .search_test').hide();
			}
		}
		self.search_test = function () {
			$('#classify>.search_test').hide().parent().css("background-color","white");
		}
	}])
	.controller('EatCtrl', ['$css', '$http', function ($css, $http) {
		var self = this;
		$css.add('./css/eat.css');
		$http.get('./json/eat.json')
			.success(function (result) {
				self.pictures = function () {return result.RspData.data.AdSwiperImage35.Banners};
				self.eat_nav = function () {return result.RspData.data.AdCategory37.Banners};
				self.main_list = function () {return result.RspData.ArticleList.List}
			})
			.error(function (errorStr) {
				console.log(errorStr)
			})
			var swiper = new Swiper(".swiper-container",{
					pagination:".swiper_pagination",
					autoplay:1000,
					autoplayDisabledOnInteraction:false,
					loop : true,
					observer:true,//修改swiper自己或子元素时，自动初始化swiper
					observeParents:true//修改swiper的父元素时，自动初始化swiper
				})
	}])
	.controller('CartCtrl', ['$css', '$location', function ($css, $location) {
		$css.add('./css/cart.css')
		var self = this;
		self.goBack = function () {
			$location.path('home');
		}
	}])
	.controller('MineCtrl', ['$css', function ($css) {
		var self = this;
		$css.add('./css/mine.css')
	}])
	.controller('DetailCtrl', ['$css', '$http','$location', 'FoodService', 'cartService', '$routeParams', function ($css, $http, $location, FoodService, cartService, $routeParams ) {
		var self = this;
		$css.add('./css/detail.css');
		self.goBackHome = function () {
			$location.path('home');
		}
		self.goBack = function () {
			$location.path('home');
			$('.foot_home_img').attr("src", "img/nav_home_selected_active.png")
		}
		self.goCart = function () {
			if (parseInt($('.footer_cart_num').html()) > 0) {
				$location.path('detail_cart');
			} else {
				$location.path('cart');
			}
			
		}
		FoodService.getFoodList().success(function (result) {
				var list = result.RspData.data;
				for (var foodObj of list) {
					if (foodObj.CommodityId == $routeParams.CommodityId) {
						 self.pictures = foodObj.Pictures;
						 self.CommodityName = foodObj.CommodityName;
						 self.OriginalPrice = foodObj.OriginalPrice;
						 self.PlaceOfOrigin = foodObj.PlaceOfOrigin;
						 self.DeliveryTips = foodObj.DeliveryTips;
						 self.voteCount = foodObj.voteCount;
						 self.voteRate = foodObj.voteRate;
						 self.Speces = foodObj.Speces;
						 
						 var FoodObj = foodObj;
						 
						 var cartData = cartService.getCartData;
						 self.addCart = function () {
						 	cartData().push(FoodObj)
						 	console.log(cartData())
							$('.footer_cart_num').html(parseInt($('.footer_cart_num').html())+parseInt($('.detail_price').html()));
							$('.footer_cart_num').show();
							$('.add_success').show(100).animate({
								width : 0,
								height : 0
							}, 2000);
							
						}

						 
					}
				}
				
		})
		var num = 0;
		self.detail_price_up = function () {
		    num = $('.detail_price').html();
			num++;
			$('.detail_price').html(num);
			
		}
	
		self.detail_price_down = function () {
			num--;
			$('.detail_price').html(num);
			($('.detail_price').html() == 0) && $('.detail_price').html(1)
		}


		var swiper = new Swiper(".swiper-container",{
					pagination:".swiper_pagination",
					autoplayDisabledOnInteraction:false,
					loop : true,
					observer:true,//修改swiper自己或子元素时，自动初始化swiper
					observeParents:true//修改swiper的父元素时，自动初始化swiper
			})
	}])
	.controller('Detail_cartCtrl', ['$css', '$location', 'cartService', function ($css, $location, cartService) {
		var self = this;
		$css.add('./css/detail_cart.css');

		
		self.detail_cartArr = cartService.getCartData;
		$('.detail_cart_clear').on('click', function () {
			var $self = $(this);
			
			$('#detail_cart .warning>p').html('您确定要清楚购物车的商品吗？')
			$('#detail_cart .warning').show();
			$('#detail_cart .warning>.affirm').on('click', function () {
				$location.path('cart');
				$('#detail_cart>.container').remove();
				$self.hide();
				$(this).parent().hide();
				$('#detail_cart .warning').hide();
				$('#detail_cart .payment').hide();
			
		})
		})
		$("#detail_cart>.container").on('click', 'li .detail_cart_pic2', function () {
			var $self = $(this);
			console.log(123)
			$('#detail_cart .warning>p').html('您确定要删除该商品')
			$('#detail_cart .warning').show();
			$('#detail_cart .warning>.affirm').on('click', function () {
				$self.parent('li').remove();
				$('#detail_cart .warning').hide();
			})
		})
		var num = 0 ;
		$('#detail_cart>.container>li .add').on('click', function () {
			num = $(this).siblings('.num').html();
			num++;
			$(this).siblings('.num').html(num);
		})
		$('#detail_cart>.container>li .decrease').on('click', function () {
			num--;
			$(this).siblings('.num').html(num);
			($(this).siblings('.num').html() == 1) &&( num = 2);
		})

		//取消功能
		$('#detail_cart .warning>.cancel').on('click', function () {
				$('#detail_cart .warning').hide();
		})
		
		
		
	}])
