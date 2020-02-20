/*********************  header特效   *************************/
/* 包含划过字体变色、搜索框按钮点击、头像变更、购物车显示隐藏  */

var Head={
	sum:0,
	toRed:function toRed () {
		$('header').find('.top a').not('.goel,.home').HoverRed().parent().has('ul').hover(function () {
			$(this).children('ul').show();
		},function () {
			$(this).children('ul').hide();
		});
	},
	formKick:function () {
		$('header').find('.search_tab').on('click',function () {
			$(this).css({'color': '#fff','background': '#ff3366'}).siblings().css({'color': '#666','background': '#f2f2f2'})
			if($(this).parent().next().attr('placeholder')){
				$(this).parent().next().attr('placeholder','')
			}else{
				$(this).parent().next().attr('placeholder','冬天的时髦先从一件毛衣开始吧')
			}
		})
	},
	face:function(){
		var name=$.cookie('name');
		if(name!=null){
			$('.hide').hide();
			$('.touxiang').show();
		}else{
			$('.touxiang').hide();
		}
	},
	gwc:function () {
		var goods=$.cookie('goods');
		if(goods!=null&&goods!='[]'){
			var json=eval(goods);
			for(i=0;i<json.length;i++){
				//console.log(json[i].num)
				this.sum=this.sum+Number(json[i].num);
			}
			$('.cartNum').show().html(this.sum);
		}else{
			$('.cartNum').hide();
		}
	},
	run:function () {
		this.face();
		this.gwc();
		this.toRed();
		this.formKick();
	}
}

/*********************  倒计时   *************************/
/* 可设置终止时间（传参）  */

var BackTime={
	init:function(date,h,m,s,dan){
		this.date=date;
		this.h=h;
		this.m=m;
		this.s=s;
		this.dan=dan;
	},
    now:function () {
    	return new Date()
    },
	end:function () {
		this.end1=new Date(this.date)
		this.end1.setHours(this.h);
		this.end1.setMinutes(this.m);
		this.end1.setSeconds(this.s);
		//console.log(this.end())
		return this.end1;
	},
	time:function () {
		return this.end()-this.now();
	},
	IsSingle:function (a) {
		if(this.dan){
			return a;
		}else{
			if(a<10){
				return a='0'+a;
			}else{
				return a;
			}
		}
	},
	set:function () {
		var day=Math.floor(this.time()/1000/60/60/24);
		var hour=Math.floor(this.time()/1000/60/60%24);
		var minute=Math.floor(this.time()/1000/60%60);
		var second=Math.floor(this.time()/1000%60);
		$('.day').html(this.IsSingle(day));
		$('.hour').html(this.IsSingle(hour))
		$('.minute').html(this.IsSingle(minute));
		$('.second').html(this.IsSingle(second));
	},
	start:function (date,h,m,s,dan) {
		BackTime.init(date,h,m,s,dan);
		BackTime.set();
	}
}


/*********************  Nav及footer特效   *************************/
/* 包含划过字体变色、导航三级导航的显示  */
var Nav={
	toRed:function () {
		$('nav,footer').find('a').HoverRed();
		$('#index_main').find('.tip').HoverRed();
	},
	Hover:function () {
		$('.nav2').children('li').hover(function () {
			//console.log($(this))
			$(this).find('.nav3').show().end().addClass('active').children('.cont').css({'border':'0','width':'264px'})
		},function () {
			$(this).find('.nav3').hide().end().removeClass('active').children('.cont').css('width','263px').end().children('.noborder').css('border','0');
		})
	},
	run:function () {
		this.toRed();
		this.Hover();
	}
}

/*********************  侧边栏特效   *************************/
/* 包含划过字体变色、背景图片变更、显示二维码 */
var Sidebar={
	Hover:function () {
		var old_url,arr,new_url;
		$('.position').find('li').hover(function () {
			old_url=$(this).css('background-image');
			arr=old_url.split('.png');
			new_url=arr[0].substring(0,arr[0].length-1)+'2.png")';
			//console.log(new_url);
			$(this).css({'background-color':'#ff3366','background-image':new_url}).find('a').css('color','#fff');
		},function () {
			//console.log(old_url);
			$(this).css({'background-color':'','background-image':old_url}).find('a').css('color','#666');
		})
	},
	Sidebar:function () {
		$('.position').find('.li1').hover(function () {
			//console.log(1)
			$(this).children('.ewm_App').show().siblings('.sanjiao').show();
		},function () {
			$(this).children('.ewm_App').hide().siblings('.sanjiao').hide();
		})
	},
	run:function () {
		this.Sidebar();
		this.Hover();
	}
}

/*******************   返回顶部按钮    ************************/
/*  hover变色、点击运动回顶部、顶部隐藏滚动显示 */
var returnBtn={
	run:function () {
		this.hover();
		this.kick();
		this.back();
	},
	hover:function() {
		$('.position').find('.return').hover(function () {
			$(this).addClass('active');
		},function () {
			$(this).removeClass('active');
		})
	},
	kick:function () {
		$('.position').find('.return').on('click',function () {
			$('html,body').stop().animate({scrollTop:0},400);
		})
	},
	show:function () {
		$('.position').find('.return').stop().animate({bottom:0},200);
	},
	hidden:function () {
		$('.position').find('.return').stop().animate({bottom:-41},200);
	},
	back:function () {
		$(window).scroll(function () {
			//console.log(8);
			var scroll=0;
			if($('html').scrollTop()){
				scroll=$('html').scrollTop();
			}else{
				scroll=$('body').scrollTop();
			}
			if(scroll==0){
				returnBtn.hidden();
			}else{
				//console.log($('.position').find('.return').offset().top);
				returnBtn.show();
			}
		})
	}
};


/*******************   购物车     ************************/
/*  加减按钮数量总价跟随变化、减号最低为1限制、划入顶部购物车商品显示、点击跳转对应商品详情、删除联动  */
var AddCart={
	kick:function () {
		//console.log($('.addcart'))
		$('.addcart').on('click',function () {
			var num=$('.num-input').val();
			var same=false;
			$(this).css('background','#eee');
			$('.addCart').show();
			$('.addCart').find('span').on('click',function () {
				$('.addCart').hide();
				$('.addcart').css('background','#fff');
			})
			//console.log($.cookie('goods'))
			if($.cookie('goods')==null){
				//console.log(JSON.stringify(arr))
				var arr=[{'num':num,'id':$.cookie('id')}];
				$.cookie('goods',JSON.stringify(arr),{path:'/'})
				
			}else{
				var json=eval($.cookie('goods'));
				for(var attr in json){
					//console.log($(json[attr]).attr('id')==$.cookie('id'))
					if(json[attr].id==$.cookie('id')){
						var all=Number(num)+Number(json[attr].num);
						$(json[attr]).attr('num',all)
						$.cookie('goods',JSON.stringify(json),{path:'/'});
						//console.log($(json[attr]).attr('num')+':'+num);
						//console.log($.cookie('goods'));
						same=true;
					}
				}
				if(!same){
					var json1=eval($.cookie('goods'));
					var obj={'num':num,'id':$.cookie('id')};
					json1.push(obj);
					$.cookie('goods',JSON.stringify(json1),{path:'/'});
				}
			}
			//console.log($.cookie('goods'))
		})
	},
	scan:function () {
		$.ajax({
			url:'../data/json.json',
			type:'GET',
			success:function(res){
				var jsonStr = $.cookie('goods');
				if(jsonStr){
					AddCart.html(jsonStr,res);
				}
			}
		})
	},
	html:function (jsonStr,res) {
		var json = eval(jsonStr);
		var html = ''; 
		for(var i in json){	
			html += '<li class="clear good"><a href="detail.html" class="imgbox left"><img src="../img/goods/'+json[i].id+'.jpg"/></a><div class="right box"><a href="detail.html" class="title left">'+ res[json[i].id-1].tip +'</a><span class="price left">¥'+res[json[i].id-1].price+'</span><span class="info left">数量: <b>'+json[i].num+'</b>  尺码: M  </span><span class="del right" id="'+json[i].id+'">删除</span></div></li>'
		}
		$('.woyao').html(html);
		AddCart.remove(json);
	},
	hover:function () {
		$('.gwc_li').HoverToggle('.gwc');
		$('.gwc_li').mouseenter(function () {
			if($.cookie('goods')==null||$.cookie('goods')=='[]'){
				$('.woyao').parent().hide();
			}else{
				$('.woyao').parent().show();
				AddCart.scan();
			}
		})
	},
	remove:function (json) {
		//console.log($('.woyao').find('.del'));
		$('.woyao').find('.del').on('click',function () {
			//console.log(JSON.stringify(json))
			for(var i in json){if(json[i].id==this.id){json.splice(i,1)}}
			$.cookie('goods',JSON.stringify(json),{path:'/'});
			AddCart.scan();
			//console.log($.cookie('goods'))
			AddCart.hover();
		})
	},
	run:function () {
		AddCart.hover();
		AddCart.kick();
		AddCart.scan();
	}
}

/*******************   吸顶     ************************/
function Mounting () {
	var top=$('.mounting').offset().top;
	$(window).scroll(function () {
		//console.log(1)
		var scroll;
		if($('body').scrollTop){
			scroll=$('body').scrollTop();
		}else{
			scroll=$('html').scrollTop();
		};
		if(scroll>top){
			$('.mounting').css({'position':'fixed','top':0,'left':0,'right':0,'margin':'auto'})
		}else{
			$('.mounting').css({'position':'absolute'})
		}
	})
}

/*******************   商品点击     ************************/

function GoodKick (url) {
	//console.log($('.good'))
	$('.goods').on('click','a',function () {
		var $li=$(this).parents('.good');
		console.log($li)
		$.cookie('id',$li.attr('id'),{path:'/'})
		window.location.href=url+"detail.html"
	})
	
}



