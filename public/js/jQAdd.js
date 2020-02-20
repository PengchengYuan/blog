;(function($$){
    $$.fn.extend({
        HoverRed:function () {
			var color='';
			this.hover(function () {
				color=$$(this).css('color');
				//console.log(this);
				$$(this).css('color','#FF3366');
			},function () {
				//console.log(color);
				$$(this).css('color',color);
			})
			return $$(this);
		}
    });
    $$.fn.extend({
        HoverToggle:function (hide_ele) {
			this.hover(function () {
				$$(hide_ele).show();
			},function () {
				$$(hide_ele).hide();
			});
			return $$(this);
		}
    });
    $$.fn.extend({
        HoverBg:function (bg,target_ele) {
        	var old;
			$$(this).hover(function () {
				old=$$(target_ele).css('background')
				$$(target_ele).css('background',bg);
			},function () {
				//console.log(old)
				$$(target_ele).css('background',old);
			});
			return $$(this);
		}
    });
})(jQuery);