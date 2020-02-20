$(function () {
	/********************    header    ***********************/
	
	Head.run();
	AddCart.run();
	
	/****************   nav  *************************/
	$('.sale_nav').find('.all').hover(function () {
		$('.nav2').show();
	},function () {
		$('.nav2').hide();
	})
	
	Nav.run();

	/********************  吸顶      ***********************/
	
	new Mounting()
	
	/*******************  商品列表 (连续加载，滚动到列表最后一个，自动加载40个商品) ************************/
	
	var Goods={
		index:0,
		last_top:0,
		jia:true,
		getjson:function (showNum,index) {
			$.ajax({
				type:"get",
				url:"../data/json.json",
				async:true,
				success:function (res) {
					Goods.html(res,showNum,index)
				}
			});
		},
		html:function (res,showNum,index) {
			var html=$('.goods').html();
			//console.log($('.goods').html())
			var dataL=res.length;
			var len;
            for(var i = showNum*index;i <showNum*index+showNum;i++){
                //console.log(i)
                if(i<dataL){
                    var ID = res[i].id;
                    var tip = res[i].tip;
                    var price = res[i].price;
                    var old_price=res[i].old_price;
                    html+='<li class="good" id="'+ID+'"><a href="detail.html" class="img_box"><img src="../img/goods/'+ID+'.jpg" alt="" /></a><div class="sale_info"><div class="clear"><span class="price left">￥'+price+'</span><span class="old_price right">￥'+old_price+'</span></div><div class="title"><a href="detail.html">'+tip+'</a></div></div></li>';
                }
            }
            $('.goods').html(html);
            this.jia=true;
            len=$('.goods').children('li').length;
            this.last_top=$('.goods').children('li').eq(len-1).offset().top;
            this.load();
             $('.title a').HoverRed();
		},
		load:function () {
			var that=this;
			$(window).scroll(function () {
				//console.log(that.last_top)
				var scroll;
				if($('body').scrollTop()){
					scroll=$('body').scrollTop();
				}else{
					scroll=$('html').scrollTop();
				}
				//console.log($(window).height())
				//console.log(that.index)
				if(scroll>that.last_top-$(window).height()){
					if(that.jia){
						that.index++;
						that.getjson(40,that.index);
					}
					that.jia=false;
				}
			})
		},
		run:function () {
			Goods.getjson(40,0);
		}
	}
	Goods.run();
	
	/*******************侧边栏************/

	Sidebar.run()
	
	/**************   返回顶部     ************/
	
	returnBtn.run();	

	/*********************  商品点击         **********************/

	GoodKick();
	
	/*******  吸顶点击     *********/
	
	$('.mounting li').on('click',function () {
		$(this).css({'background':'#fff','color':'#da6968'}).siblings().css({'background':'#da6968','color': '#fff'})
	})
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})
