$(function  () {
	//console.log(1)	
	/*****************  FACE   头像设置     ************************/
	
	Head.face();
	
	/*****************  hover 鼠标划过事件************************/
	
	new Hover();
	function Hover () {
		$('.gwc_li').next().HoverToggle('.help_li .nav2');
		
		$('.detail_head .shop').HoverBg('#f5f5f5','.detail_head .shop').HoverBg('url(../img/detail/arrow_top.png) no-repeat 12px 5px','.arrow');
		
		$('.detail_nav .all').HoverToggle('.all .nav2');
		//console.log($('.detail_nav .all')[0])
		
		$('.detail_nav .all').find('li').hover(function () {
			$(this).css('background-color','rgba(80,80,80,.9)').children('.nav3').show();
		},function () {
			$(this).css('background-color','rgba(0,0,0,.8)').children('.nav3').hide();
		});
	}
	
	/**************************  商品列表     ***********************************/
	
	new Goods();
	function Goods(){
		var that=this;
		$.ajax({
	        url:'../data/json.json',
	        type:'GET',
	        dataType:'json',
	        success:function(res){
	        	//console.log(res)
	        	var id=$.cookie('id');
	        	var html='';
	        	//console.log(res.length)
	        	//console.log(res.length)
	        	for(var i=0;i<res.length;i++){
	        		if($(res[i]).attr('id')==id){
	        			that.html(res[i],id)
	        			//console.log(res[i],id)
	        		}
	        	}
	        }
	    })
	}
	Goods.prototype.html=function (obj,id) {
		//console.log(res[i]);
		var tip=$(obj).attr('tip');
		var price=$(obj).attr('price');
		var old_price=$(obj).attr('old_price');
		var remain=$(obj).attr('remain');
		$('title,.pro h1').html(tip);
		$('.detail_main .detail .big,.detail_main .detail .small a:nth-child(1),.detail_main .detail .fangda .big_img,.pro .style .img a').children('img').attr('src','../img/goods/'+id+'.jpg');
		$('.detail_main .chuanzhuo').attr('src','../img/goods/'+id+'.jpg');
		$('.detail_main .new').html('¥'+price);
		$('.detail_main .old_price del').html('¥'+old_price);
		//console.log($('.detail_main .old_price')[0]);
	}
	
	/********************   倒计时      ***********************/
	
	setInterval(function () {
		BackTime.start('2017/2/1',10,0,0,true);
	})
	
	/********************  选择尺码点击事件  *********************/
	
	$('.pro').find('.img ,.smlm').on('click',function () {
		$(this).siblings().children().removeClass('bg').end().end().children('span').toggleClass('bg');
	});
	
	/********************  选择商品数量增加 事件  *********************/
	
	var Goods_num={
		run:function () {
			Goods_num.add();
			Goods_num.reduce();
			Goods_num.opcity();
		},
		add:function () {
			var that=this;
			$('.num-add').on('click',function () {
				var val=$('.num-input').val();
				val++;
				$('.num-input').val(val);
				that.opcity();
			})
		},
		reduce:function () {
			var that=this;
			$('.num-reduce').on('click',function () {
				var val=$('.num-input').val();
				if(val==1){
					$('.num-input').val(1);
					$('.num-reduce').css({'opacity':0.3})
				}else{
					val--;
					$('.num-input').val(val)
				}
				that.opcity();
			})
		},
		opcity:function () {
			var val=$('.num-input').val();
			val==1?$('.num-reduce').css({'opacity':0.3}):$('.num-reduce').css({'opacity':1});
		}
	}
	
	Goods_num.run();
	
	/*******************   放大镜     ************************/
	
var FangDaJing={
	run:function() {
		var that=this;
		$('.mask').hover(function(){
			that.overfn();
		},function(){
			that.outfn();
		});
		$('.mask').mousemove(function(){
			that.movefn();
		});
	},
	overfn:function () {
		$('.position_box').show();
		$('.fangda').show();
	},
	outfn:function () {
		$('.position_box').hide();
		$('.fangda').hide();
	},
	movefn:function (event) {
		var evt=event||window.event;
		var left=evt.offsetX-$('.position_box').width()/2
		left=left<0?0:left;
		left=left>$('.mask').width()-$('.position_box').width()?$('.mask').width()-$('.position_box').width():left;
		//console.log(left);
		$('.position_box').css('left',left+'px');
		var top=evt.offsetY-$('.position_box').height()/2;
		top=top<0?0:top;
		top=top>$('.mask').height()-$('.position_box').height()?$('.mask').height()-$('.position_box').height():top;
		$('.position_box').css('top',top+'px');
		var Bleft=left/($('.mask').width()-$('.position_box').width())*($('.big_img').width()-$('.fangda').width());
		var Btop=top/($('.mask').height()-$('.position_box').height())*($('.big_img').height()-$('.fangda').height());
		$('.big_img').css('left',-Bleft+'px');
		$('.big_img').css('top',-Btop+'px');
	}
}

	FangDaJing.run();
	
	/**************************  选项卡切换   *********************/
	
	new ImgScan();
	function ImgScan(){
		$('.small').find('.img').on('mouseenter',function () {
			var src=$(this).find('img').attr('src');
			$('.big').find('img').attr('src',src);
			$('.fangda').find('img').attr('src',src);
			$(this).css('opacity',1).siblings().css('opacity',.5);
		})
	}
	
	/***********************  楼梯效果    *************************/
	
	var Mounting={
		bar_top:Math.round($('.bar').offset().top),
		scroll:function () {
			this.bar_kick();
			this.navbar_kick();
			var that=this;
			$(window).scroll(function () {
				var scoll_top=0;
				if($('body').scrollTop()){
					scoll_top=$('body').scrollTop();
				}else{
					scoll_top=$('html').scrollTop();
				}
				that.fixed(scoll_top,that.bar_top);
				that.navbar_active(scoll_top);
			})
		},
		fixed:function (scoll_top,bar_top) {
			if(scoll_top>bar_top){
				$('.addcart,.shop-hd,.bar').css({'position':'fixed','top':0});
				$('.shop-hd').css('width','219px');
				$('.bar_nav').css({'position':'fixed','top':'71px'});
			}else{
				$('.addcart,.shop-hd,.bar').css('position','relative');
				$('.shop-hd').css('width','196px');
				$('.bar_nav').css('position','absolute');
			}
		},
		bar_kick:function () {
				$('.b-center .bar').find('.left').on('click',function () {
				$(this).children('a').addClass('active').parent().siblings().children('a').removeClass('active');
				$('html,body').scrollTop(Mounting.bar_top);
				if($(this).index()==1){
					$('.evaluate').show().siblings().hide();
					$('.bar_nav').hide();
				}else if($(this).index()==2){
					$('.evaluate').hide().siblings('.same_class').show().siblings('.detail_top').hide();
					$('.bar_nav').hide();
				}else{
					$('.evaluate').hide().siblings().show();
					$('.bar_nav').show();
				}
			})
		},
		navbar_active:function (scoll_top) {
			if(scoll_top<$('.shop_detail').find('h1').eq(1).offset().top-100){
				this.active(0);
			}else if(scoll_top<$('.shop_detail').find('h1').eq(2).offset().top-100){
				this.active(1);
			}else if(scoll_top<$('.shop_detail').find('h1').eq(3).offset().top-100){
				this.active(2);
			}else if(scoll_top<$('.shop_detail').find('h1').eq(4).offset().top-100){
				this.active(3);
			}else if(scoll_top<$('.shop_detail').find('h1').eq(5).offset().top-100){
				this.active(4);
			}else if(scoll_top>=$('.shop_detail').find('h1').eq(5).offset().top-100){
				this.active(5);
			}
		},
		active:function (i) {
			$('.bar_nav').children('li').removeClass('hover').children('a').removeClass('active').end().eq(i).addClass('hover').children('a').addClass('active');
		},
		navbar_kick:function () {
			$('.bar_nav').find('li').on('click',function () {
				$('html,body').scrollTop($('.shop_detail').find('h1').eq($(this).index()).offset().top-50);
				console.log($('.shop_detail').find('h1').eq($(this).index()).offset().top)
				return false;
			})
		}
	};
	
	Mounting.scroll();
	
	/****************  购物车的联动     ********************/
	
	AddCart.run();
	
	

	
})
