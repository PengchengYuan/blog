$(function () {
	//console.log(1);
/**********     头部           *****************/

Head.run();

AddCart.run();

/****************   nav  *************************/

Nav.run();


/************  banner  **************/

function Banner() {
	var that=this;
	var $li=$('banner').find('li');
	var $ul=$li.parent();
	this.i=0;
	$('.btnR').on('click',function () {
		$li.css('left','900px');
		$li.eq(that.i).css('left','0')
		if(that.i==$li.length-1){
			that.i=0;
			//console.log(0)
			$li.eq($li.length-1).stop().animate({left:-900}).siblings('.first').animate({left:0});
		}else{
			that.i++;
			//console.log(that.i);
			$li.eq(that.i-1).stop().animate({left:-900}).next().animate({left:0})
		}
		change();
	})
	$('.btnL').on('click',function () {
		$li.css('left','-900px');
		$li.eq(that.i).css('left','0')
		if(that.i==0){
			that.i=$li.length-1;
			//console.log(that.i)
			$li.eq(0).stop().animate({left:900}).siblings('.last').animate({left:0});
		}else{
			that.i--;
			//console.log(that.i)
			$li.eq(that.i+1).stop().animate({left:900}).prev().animate({left:0})
		}
		change();
	})
	this.timer=setInterval(function () {
		$('.btnR').click()
	},2000);
	$('banner').find('.cont').mouseenter(function () {
		clearInterval(that.timer);
	})
	$('banner').find('.cont').mouseleave(function () {
		that.timer=setInterval(function () {
			$('.btnR').click()
		},2000);
	})
	function change() {
		$('.mark').children('em').css('width','10px');
		$('.mark').children('em').eq(that.i).css('width','20px');
	}
	change();
	$('.mark').children('em').on('click',function () {
		//console.log($(this).index())
		$li.css('left','900px');
		$li.eq(that.i).css('left','0')
		$li.eq(that.i).stop().animate({left:-900});
		$li.eq($(this).index()).stop().animate({left:0});
		that.i=$(this).index();
		change();
	})
}
new Banner();


/*************  倒计时    **************/
setInterval(function () {
	BackTime.start('2017/1/31',9,35,21,false);
},1000);	
/*******************侧边栏************/

Sidebar.run()

/**************   返回顶部     ************/

returnBtn.run();	

/************  mask遮罩层     *************/
var Mask={
	MaskBig:function(select) {
		var that=this;
		var allheight=$('.index_body').height();
		$(select).on('click',function () {
			//console.log($(this).parent());
			//console.log($(this).parent().parent());
			$(this).parent().hide().parent().prev().hide();
			$('.index_body').height(allheight).css('overflow','auto');
			//console.log($('body').height())
			return false;
		})
	},
	MaskSmall:function (select) {
		var that=this;
		$(select).on('click',function () {
			//console.log($(this).parent());
			//console.log($(this).parent().parent());
			$(this).parent().hide();
			return false;
		})
	},
	run:function () {
		//console.log($('.index_body').height());
		var allheight=$('.index_body').height();
		$('.index_body').height($(window).height( ));
		this.MaskBig('.maskall .bx');
		this.MaskSmall('.maskall .sx');
	}
}

Mask.run();

/******************  商品点击**************************/

new GoodKick('html/')

})
