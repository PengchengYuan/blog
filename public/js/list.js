$(function () {
	/********  hover 划过效果及全篇划过变红********/
	
	Head.run();

	AddCart.run();
	
	$('#list_nav a,#list_main .sublist a,#list_main .goods .tip a,#list_main .sort a').HoverRed();
	
	
	$('#list_nav a').hover(function () {
		$(this).addClass('active');
	},function () {
		$(this).removeClass('active');
	})
	
	$('.sort .prices').hover(function () {
		$('.price_sort').show();
		$('.price_sort').css('color','#666')
	},function () {
		$('.price_sort').hide();
	})
	
	/*****************  侧边栏  ******************/

	Sidebar.run()

	/**************   返回顶部     ************/

	returnBtn.run();	
	
	
	/***********************************分页和页面加载  *******************************************/
	function Pagination(num){
        $.ajax({
            url:'../data/json.json',
            type:'GET',
            dataType:'json',
            success:function(res){
            	//console.log(res)
                var showNum=num;                         //计算一夜总商品数量
                var dataL=res.length;                    //数据对象总长度
                var pageNum=Math.ceil(dataL/showNum);    //一共多少页
                $('.pageation').pagination(pageNum,{    
                    num_edge_entries: 1,                 //左右省略号边有几个按钮
                    num_display_entries: 7,              //省略号中间有几个按钮
                    items_per_page: 1,                   //每页显示几项
                    prev_text: "<上一页",
                    next_text: "下一页>",
                    callback:function(index){             //index为现在在第几页
                        var html=''
                        for(var i = showNum*index; i < showNum*index+showNum;i++){
                            //console.log(i)
                            if(i<dataL){
                                    var ID = res[i].id;
                                    var tip = res[i].tip;
                                    var price = res[i].price;
                                    var sws=Math.ceil(Math.random()*9999);
                                    html+='<li class="left" id="'+ ID +'"><dl><dt><a href="detail.html"><img src="../img/goods/'+ ID +'.jpg"/></a></dt><dd class="price clear"><span class="left">¥'+ price +'</span><i class="right">'+ sws +'</i></dd><dd class="tip"><a href="detail.html">' +  tip + '</a></dd><em><img src="../img/list/thanks.png"/></em></dl></li>';
                            }
                        }
                        $('.goods').html(html);
                    }
                })
                $('#list_main .goods .tip a').HoverRed();
            }
        })
    }
	new Pagination(20);
	
	//商品点击跳转响应详情页
	function GoodKick () {
		$('.goods').on('click','a',function () {
			var $li=$(this).parent().parent().parent();
			$.cookie('id',$li.attr('id'),{path:'/'})
		})
	}
	
	new GoodKick()
	
	
	
})