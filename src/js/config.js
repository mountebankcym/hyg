require.config({
  baseUrl: "/",
  paths: {
		"jquery": "/libs/jquery-3.2.1.min",
		"footer": "/js/modules/footer",
		"header": "/js/modules/header",
		"url":"/js/modules/url",
		'template':"/libs/template-web",
		"zoom": "/libs/jquery.elevateZoom-3.0.8.min",
		"cookie":"/libs/jquery.cookie",
		"swiper": "libs/swiper/js/swiper"
  },
	shim:{
		"cookie" : {
			deps : ["jquery"]
		},
		"zoom" : {
		  deps: ['jquery']
		}
	}
})