define(["jquery"],($)=>{
	class foot{
		constructor () {
			this.footerContent = $("#footer-content")
			this.load();
		}
		
	load(){
		new Promise(resolve => {
			this.footerContent.load("/html/module/footer.html")
		}, () => {
          // load异步执行结束
          resolve();
        })
	}
	
	
	
	}
	return new foot()
})