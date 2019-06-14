define(['jquery',"cookie","url"], ($,cookie,url) => {
  function Header () {
    this.container = $("#header-content");
    this.load().then(()=>{
		this.enter = $(".enter")
		this.off = $(".login-off")
		this.on = $(".login-page")
		this.btn1 = $(".login-in")
		this.wel = $(".welcome")
		this.loginIn()
		this.loginOff()
		this.loginShow()
		this.user()
		this.exit()
		this.test();
	})

  }

  // Object.assign(Header.prototype, {

  // });

  // 对象合并
  $.extend(Header.prototype, {
    // ES6对象增强写法
		load () {
			// header.html加载到container里
			// this.container.load('/html/module/header.html #header-bottom'); // 选择加载文件中的某一部分
			return new Promise(resolve => {
				this.container.load('/html/module/header.html', () => {
					// load异步执行结束
					resolve();
				});
			})
		},
	
	
		loginOff(){
			this.off.click(()=>{
				$(".modal").hide();
			})
		},
		test(){
			console.log(145555)
		},
		loginShow(){
			this.on.click(()=>{
				$(".modal").show();
			})
			console.log(1222)
		},
		loginIn(){
			this.btn1.click(()=>{
				let username = $(".name").val(),password = $(".password").val();
				$(".modal").hide();
				$.ajax({
					url:url.phpBaseUrl +　"/api/v1/login.php",
					data:{
						username,password
					},
					dataType:'json',//服务器返回json格式数据
					type:'post',//HTTP请求类型
					success:data => {
						this.scc(username)
						// if(data.code===200){
							//ok
							
						// }
					},
				});
			})
		},
		
		scc(username){
			let obj = {
				path:"/",
				expires:7
			}
			this.enter.css("background","none").mouseenter(function() {
				$(".getOut").addClass("getOut-isLogin")
			}).mouseleave(function() {
				$(".getOut").removeClass("getOut-isLogin")
			})
			$.cookie("username",username,obj)
			let val = $.cookie("username")
			this.user()
		},
		
		user(){
			let val = $.cookie("username")
			if(val){
				this.wel.html($.cookie("username"))
				$(".modal").hide()
				$(".reg-page").hide()
				$(".shuxian").hide()
				$(".register").hide()
				$(".welcome").show()
				this.on.hide()
				
				
				this.enter.css("background","none").mouseenter(function() {
					$(".exit").addClass("exit-isLogin")
				}).mouseleave(function() {
					$(".exit").removeClass("exit-isLogin")
				})
			}
		},
		exit(){
			$(".exit").click(()=>{
				
				$.removeCookie("username",{path:"/"})
				$(".reg-page").show()
				this.on.show()
				$(".welcome").hide()
				$(".exit").hide()
				window.location.reload(); 
				$(".shopCar-num").text(0)
			})
		},
		
		
  })

  return new Header();
});