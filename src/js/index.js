require(["config"], () => {
	require(["template","url","swiper","footer", "header"], (template,url,Swiper) => {
		class Index {
			constructor() {
				this.banner();
				this.a();
				this.show();
			}

			banner() {
				var mySwiper = new Swiper('.swiper-container', {
					autoplay: true,
					loop: true, // 循环模式选项
					// 如果需要分页器
					pagination: {
						el: '.swiper-pagination',
						clickable: true
					},

					// 如果需要前进后退按钮
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev'
					}

				})
			}

			a() {
				console.log(1111);

			}
			
			show(){
				$.get(url.rapBaseUrl+'index/ticket',resp=>{
					if(resp.res_code===200){
						this.pushShow(resp.res_body);
					}
				})
			}
			pushShow(resbody){
				let html=template('list-template',{list:resbody.list})
				//console.log(html);
				$("#list_con").html(html);
			}
		}
		new Index();
	})
})
