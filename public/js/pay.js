$(function () {
	//console.log(1)
	AddCart.run();
	var Pay={
		num:0,
		sum:0,
		goods_list:function () {
			$.ajax({
				url:'../data/json.json',
				type:'GET',
				success:function(res){
					var jsonStr = $.cookie('goods');
					if(jsonStr){
						Pay.html(jsonStr,res);
					}
				}
			})
		},
		html:function (jsonStr,res) {
			var json = eval(jsonStr);
			var html = ''; 
			for(var i in json){					
				html += '<tr class="good" id="'+json[i].id+'"><td><input type="checkbox" class="vm"></td><td class="pro"><a href="" class="img"><img src="../img/goods/'+json[i].id+'.jpg" alt=""></a><a href="" class="tip">'+res[json[i].id-1].tip+'</a></td><td class="xx"><p class="color">颜色：红色</p><p class="size">尺码：均码</p></td><td class="price"><del class="old">'+res[json[i].id-1].old_price+'</del><p class="new">'+res[json[i].id-1].price+'</p><p class="sales"><span>'+Math.floor(res[json[i].id-1].price/res[json[i].id-1].old_price*100)/10+'</span>折</p></td><td class="num"><div><div class=""><input class="num" type="text" id="'+json[i].id+'" value="'+json[i].num+'"/></div></div></td><td><p class="sum">'+(json[i].num*res[json[i].id-1].price).toFixed(2)+'</p></td><td class="cart_alcenter"><a href="javascript:;" class="delect" id="'+json[i].id+'">删除</a></td></tr>';
				this.num+=1;
				this.sum+=json[i].num*res[json[i].id-1].price;
			}
			$('.woyao1').html(html);
			$('.pay_main .top').find('.num').html(this.num);
			this.check_kick();
			this.ipt_change(json);
			this.del(json);
		},
		check_kick:function () {
			var that=this;
			var all_sum=Number($('.all_sum').html());
			var all_num=Number($('.all_num').html());
			$('.vm').on('change',function () {
				var all_sum=Number($('.all_sum').html());
				var all_num=Number($('.all_num').html());
				var check_num=0;
				if($(this).is(':checked')){
					//console.log(all_num)
					$('.all_num').html(all_num+1);
					$('.all_sum').html((all_sum + Number($(this).parent().parent().find('.sum').html())).toFixed(2));
					for(var i=0;i<$('.vm').length;i++){
						$('.vm').eq(i).prop('checked')==true?check_num++:check_num+0;
					}
					if(check_num==$('.vm').length){$('.all_check').prop('checked',true);}
				}else{
					$('.all_num').html(all_num-1);
					$('.all_sum').html((all_sum - Number($(this).parent().parent().find('.sum').html())).toFixed(2));
					$('.all_check').prop('checked',false);
				}
				
			})
			$('.all_check').on('change',function () {
				if($(this).is(':checked')){
					$('.all_num').html(that.num);
					$('.all_sum').html(that.sum.toFixed(2));
					$('input[type=checkbox]').prop('checked',true);
				}else{
					$('.all_num').html(0);
					$('.all_sum').html('0.00');
					$('input[type=checkbox]').prop('checked',false);
				}
			})
			
		},
		ipt_change:function (json) {
			$('input[type=text]').on('change',function () {
				//console.log(1)
				for(var i=0 in json){
					if(this.id==json[i].id){
						json[i].num=Number($(this).val())
						//console.log(json[i].num+':'+$(this).val())
					}
				}
				$.cookie('goods',JSON.stringify(json),{path:'/'});
				//console.log($.cookie('goods'))
				Pay.goods_list();
			})
		},
		del:function (json) {
			//console.log($('.del'))
			var that=this;
			$('.delect').on('click',function () {
				$('.delect').eq($(this).index());
			});
			$('.delect').on('click',function () {
				that.num=that.num-1;
				//console.log(that.num)
				if($('.vm').eq($(this).index('.delect')).is(':checked')){
					$('.vm').eq($(this).index('.delect')).click();
					$(this).parent().parent().remove();
					$('.pay_main .top').find('.num').html(that.num);
					for(var i in json){if(json[i].id==this.id){json.splice(i,1)}}
					$.cookie('goods',JSON.stringify(json),{path:'/'});
					//console.log(this.id)
				}else{
					$(this).parent().parent().remove();
					$('.pay_main .top').find('.num').html(that.num);
					for(var i in json){if(json[i].id==this.id){json.splice(i,1)}}
					$.cookie('goods',JSON.stringify(json),{path:'/'});
					console.log(this.id)
					
				}
			});
			$('.all_del').on('click',function () {
				if($('.all_check').is(':checked')){
					//console.log(json)
					$('.woyao1').remove();
					$('.pay_main .top').find('.num').html('0');
					$('.all_sum').html('0.00');
					$.cookie('goods',null,{path:'/'});
				}
			});
			//console.log($('.woyao').find('.del'))
			$('.woyao').on('click','.del',function () {
				//console.log($(this).index('.del'))
				$('.vm').eq($(this).index('.del')).click();
				$('.delect').eq($(this).index('.del')).click();
			})
		}
	}
	
	Pay.goods_list();
	
})
