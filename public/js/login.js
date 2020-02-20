$(function () {
	//console.log(1)
	function login() {
		var phone;
		$('.iphone').on('focus',function () {
			$('.error_tips').hide();
		});
		$('.iphone').on('blur',function () {
			if($(this).val()==''||/^[1][358][0-9]{9}$/.test($(this).val())==false){
				$('.error_tips').html('请输入合法的手机号').show();
				//console.log($(this).val())
			}
			phone=$('.iphone').val();
		});
		$('.pass').on('focus',function () {
			$('.error_tips').hide();
		});
		$('.pass').on('blur',function () {
			if($(this).val()==''){
				$('.error_tips').html('请输入密码').show();
				//console.log($(this).val())
			}
		});
		$('.login').on('click',function () {
			if($('.iphone').val()==''){
				$('.error_tips').html('请输入合法的手机号').show();
			}else if($('.iphone').val()!=''&&$('.pass').val()==''){
				$('.error_tips').html('请输入密码').show();
			}else{
				$.ajax({
					url:'http://datainfo.duapp.com/shopdata/userinfo.php',
					type:'post',
					data:{status:'login',
						  userID:$('.iphone').val(),
					      password:$('.pass').val()
					      },
					success:function(res){
						switch(res){
							case '0': 
							$('.error_tips').html('用户名或密码错误，请重新登录').show();
							break;
							case '2': 
							$('.error_tips').html('用户名或密码错误，请重新登录').show();
							break;
							default:
							$.cookie('name',phone,{path:'/'});
							alert('恭喜你，登录成功，点击确定后开始shopping吧')
							window.location.href="../index.html";
						}
					}
				})
			}
			
		})
	}
	new login();
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})
