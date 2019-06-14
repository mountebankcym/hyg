require(["config"],()=>{
	require(["jquery","url"],($,url)=>{
		class reg{
			constructor () {
				this.name = $(".name")
				this.password = $(".password")
				this.btn = $(".reg")
				this.isReg()
			}
			
			isReg(){
				this.btn.on("click",()=>{
					let username = this.name.val(),password = this.password.val();
					$.ajax({
						data:{
							username,password
						},
						url:url.phpBaseUrl + "/api/v1/register.php",
						dataType:'json',//服务器返回json格式数据
						type:'post',//HTTP请求类型
						success:(data)=>{
							if(data.res_code === 1){
								alert("注册成功！");
								location.href="/";
							}
						},
						
					});
					
				})
			}
			
			
		}
		new reg()
	})
})