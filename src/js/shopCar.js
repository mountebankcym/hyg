require(["config"], () => {
	require(["cookie", "url", "header", "footer"], (cookie, url) => {
		class shopCar {
			constructor() {
				this.show()
				this.login()
				this.allCheck()
				this.allChecks()
				this.check()
				this.del()
				this.n = 0
				this.addNum()
				this.subNum()
			}

			addNum() {
				let arr = JSON.parse(window.localStorage.getItem($.cookie("username")));
				let _this = this
				$(".add-num").click(function() {
					let id = this.getAttribute("data-id")
					let proNum = $(this).prev()
					let num = Number(proNum.text()) + 1
					let allPri = $(this).parent().next()
					proNum.text(num)
					for (let val of arr) {
						if (val.id == id) {
							let pic = Number(val.price)
							allPri.text(num*pic)
							val.num = num
						}
					}
					window.localStorage.setItem($.cookie("username"), JSON.stringify(arr));
					_this.price()
				})

			}

			subNum() {
				let arr = JSON.parse(window.localStorage.getItem($.cookie("username")));
				let _this = this
				$(".sub-num").click(function() {
					let id = this.getAttribute("data-id")
					let proNum = $(this).next()
					let num = Number(proNum.text()) - 1
					let allPri = $(this).parent().next()
					proNum.text(num)
					for (let val of arr) {
						if (val.id == id) {
							let pic = Number(val.price)
							allPri.text(num*pic)
							val.num = num
						}
					}
					window.localStorage.setItem($.cookie("username"), JSON.stringify(arr));
					_this.price()
				})
			}






			show() {
				let arr = JSON.parse(window.localStorage.getItem($.cookie("username")));
				if (arr.length === 0) {
					$(".noShop").show()
					$(".allShop").hide()
				} else {
					$(".noShop").hide()
					$(".allShop").show()
					this.render()
				}
			}

			render() {
				let name = $.cookie("username"),
					html = ""
					
				var arr = JSON.parse(window.localStorage.getItem(name))
				html +=
					`
					<h2>订单信息</h2>
					<div class="message">
						<span>商品</span>
						<span>单价</span>
						<span>数量</span>
						<span>金额</span>
						<span>操作</span>
					</div>
					`
				arr.forEach((obj) => {
					let {
						num,
						img,
						price,
						name,
						id
					} = obj
					let allPrice = num * price
					
					html +=
						`<li class="del">
							<input type="checkbox" class="check">
							<img src=${img} alt="">
							<p class="p1">${name}</p>
							
							<p class="price">${price}</p>
							<div class="num">
								<a href="javascript:;"  class="sub-num" data-id=${id}>-</a>
								<a href="javascript:;"  class="num" data-id=${id}>${num}</a>
								<a href="javascript:;"  class="add-num" data-id=${id}>+</a>
							</div>
							<p class="pro-allPrice">${allPrice}</p>
							<a href="javascript:;" class="doList">删除</a>
						</li>`
				})
				html +=
					`
					<li class="rump-li">
						<div class="li-left">
							<input type="checkbox" id="allCheck1" class="all">
							<a class="allBtn">全选</a>
						</div>
						<div class="li-right">
							<p>商品总价：¥ <span class="start-allPrice">0.00</span></p>
							<p>优惠节省：¥ <span>0.00</span></p>
							<p>合计：¥ <span class="end-allPrice">0.00</span></p>
						</div>
					</li>
					`
				$(".allShop").html(html)

			}

			login() {
				$("#header-content").on("click", "#logining", () => {
					window.location.reload();
				})
			}


			allCheck() {
				$(".big_main").on("click", "#allCheck", () => {
					let checked = $(".all").prop("checked")
					if (checked) {
						$(".check").prop("checked", checked)
						$("#allCheck1").prop("checked", checked)
						this.price()
					} else {
						$(".check").prop("checked", checked)
						$("#allCheck1").prop("checked", checked)
						this.price()
					}
				})
			}

			allChecks() {
				$(".big_main").on("click", "#allCheck1", () => {
					let checked = $("#allCheck1").prop("checked")
					if (checked) {
						$(".check").prop("checked", checked)
						$("#allCheck").prop("checked", checked)
						this.price()
					} else {
						$(".check").prop("checked", checked)
						$("#allCheck").prop("checked", checked)
						this.price()
					}
				})
			}


			check() {
				let _this = this
				for (let i = 0; i < $(".check").length; i++) {
					$(".check").eq(i).on("click", function() {
						_this.price()
						if (this.checked === true) {
							_this.n++
							if (_this.n === $(".check").length) {
								$("#allCheck").prop("checked", true)
								$("#allCheck1").prop("checked", true)
							}
						} else {
							_this.n--
							$("#allCheck").prop("checked", false)
							$("#allCheck1").prop("checked", false)
						}
					})
				}
			}

			checkChange() {
				if (this.n == $(".check").length) {
					$("#allCheck").prop("checked", true)
					$("#allCheck1").prop("checked", true)
				}
			}



			price() {
				let price = 0
				$(".check").each(function(index) {
					let is = $(this).prop("checked")
					if (is) {
						let a = parseInt($(".pro-allPrice")[index].innerHTML)
						price += a;
					}
				})
				$(".end-allPrice").text(price)
				$(".start-allPrice").text(price)
			}

			del() {
				$(".big_main").on("click", ".doList", () => {
					//console.log($(".doList"))
					$(".doList").each(function(index) {
						let name = $.cookie("username")
						let arr = JSON.parse(window.localStorage.getItem(name))
						arr.splice(index, 1)
						console.log(arr)
						window.localStorage.setItem($.cookie("username"), JSON.stringify(arr));
						
					})
					this.show()
					this.price()
				})
			}

		}
		new shopCar()
	})
})
