$(function () {
	//$('.phone')[0].focus();
	function phone_validate() {
		$('.phone1').on('focus',function () {
			$('.error_tips').hide();
			$('.form_second').height('156')
		});
		$('.phone1').on('blur',function () {
			if($(this).val()==''||/^[1][358][0-9]{9}$/.test($(this).val())==false){
				$('.error_tips1').html('请输入合法手机号');
				$('.error_tips1').show();
				$('.form_second').height('247')
				//console.log($(this).val())
			}
		});
	}
	new phone_validate();
	function submit_phone(){
		$('.submit1').on('click',function () {
			var condition=$('.phone').val()!=''&&/^[1][358][0-9]{9}$/.test($('.phone').val());
			//console.log($('.form_first').height())
			if(condition&&!($(':checkbox')[0].checked)){
				$('.error_tips1').html('请先同意美丽说注册条款');
				$('.error_tips1').show();
				$('.form_second').height('247');
			}else if(condition&&$(':checkbox')[0].checked&&$('.code').val()!=num){
				$('.error_tips1').html('您输入的手机验证码有误');
				$('.error_tips1').show();
				$('.form_second').height('247')
			}else if(condition&&$(':checkbox')[0].checked&&$('.code').val()==num){
				$('.error_tips1').hide();$('.form_second').height('156')
				$.ajax({
					url:'http://datainfo.duapp.com/shopdata/userinfo.php',
					type:'post',
					data:{status:'login',
						  userID:$('.phone').val(),
					     },
					success:function(res){
						if(res=='0'){
							$('.form_first').hide();
							$('.form_second').height('141')
						}else{
							alert('此用户名已被注册,请登录或更换手机号');
						}
					}
				})
			}
			
		})
	}
	new submit_phone();
	function password_validate(){
		$('.pass').on('focus',function () {
			$('.error_tips').hide();
			$('.form_second').height('141')
		});
		$('.pass').on('blur',function () {
			//console.log($(this).val())
			//console.log(!(reg.test($(this).val()))+':'+/^\S{6,16}$/.test($(this).val())+':'+$(':checkbox')[1].checked);
			if(/^[0-9]{0,9}$/.test($(this).val())||!(/^\S{6,16}$/.test($(this).val()))||$(this).val()==''){
				$('.error_tips2').html('密码6-16位,不包含空格,不是9位以下纯数字');
				$('.error_tips2').show();
				$('.form_second').height('188')
			}
		});
	}
	new password_validate();
	function submit_pass(){
		$('.submit2').on('click',function () {
			var condition=!(/^[0-9]{0,9}$/.test($('.pass').val()))&&/^\S{6,16}$/.test($('.pass').val())&&$('.pass').val()!='';
			console.log($('.pass').val())
			console.log(!(/^[0-9]{0,9}$/.test($('.pass').val())))
			console.log(/^\S{6,16}$/.test($('.pass').val()))
			console.log($('.pass').val()!='')
			//console.log($('.form_first').height())
			if(condition&&!($(':checkbox')[1].checked)){
				$('.error_tips2').html('请先同意美丽说注册条款');
				$('.error_tips2').show();
				$('.form_second').height('188');
			}else if(condition&&$(':checkbox')[1].checked){
				$.ajax({
					url:'http://datainfo.duapp.com/shopdata/userinfo.php',
					type:'post',
					data:{
						status:'register',
						userID:$('.phone').val(),
						password:$('.pass').val()
					},
					success:function(res){
						if(res=='1'){
							alert('终于成功了，点击确定进行登录');
							window.location.href="login.html";
						}
					}
				})
			}
		})
	}
	new submit_pass()
	var num;
	function getCode () {
		//console.log(num);
		$('.getCode').on('click',function () {
			num=''+Math.floor(Math.random()*9)+Math.floor(Math.random()*9)+
				Math.floor(Math.random()*9)+Math.floor(Math.random()*9);
			alert('您的验证码是   '+num);
		})
	}
	new getCode();
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})
