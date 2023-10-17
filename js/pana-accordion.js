/*
* author: pace zhong
* date: 2015-06-15
* desc: accordion componet
* dependencies: jQuery 1.6+
*/
var accordion= {
	init: function(options){
		var that=this;
		options = $.extend(true,{
			expandWidth: 500,
			itemWidth: 100,
			extpand: 0,
			autoPlay: true,
			delay: 3000,
			animateTime: 400,
			borderWidth: 1,
			autoPlay: true,
			deviator: 30,
			bounce:"-50px"
		},options);
		that.initDom(options);
		if(options.autoPlay){
			that.autoPlay(options);
		}
		that.event(options);
	},
	event: function(options){
		var that=this,
				$items=$("#"+options.id).find(".pana-accordion-item");
		$items.on("mouseover",function(){
			if(options.autoPlay){
				that.clearAnimate();
			}
			that.active(options,$(this));
		});
		$items.on("mouseout",function(){
			if(options.autoPlay){
				that.autoPlay(options);
			}
		});
	},
	clearAnimate: function(){
		if(this.delay){
			clearTimeout(this.delay);
		}
	},
	autoPlay: function(options){
		var that=this;
		that.clearAnimate();
		that.delay=setTimeout(function(){
			$next=$("#"+options.id).find(".active").next();
			if($next.length==0) {
				$next=$("#"+options.id).find(".pana-accordion-item:eq(0)");
			}
			that.active(options,$next);
			that.autoPlay(options);
		},options.delay);
	},
	active: function(options,$current){
		if($current && $current.hasClass('active')) return;

		var $items=$("#"+options.id).find(".pana-accordion-item"),
				beforeIndex=$items.filter(".active").index(),
				currentIndex=$current.index(),
				itemWidth=options.itemWidth,
				expandWidth=options.expandWidth;

		$items.removeClass("active").removeClass("hide-mask");
		$items.each(function(i,elem){
			var $item=$(elem),
					$next=$current.next().length==0 ? $($items[1]) : $current.next(),
					pos_left=(i==0 ? 0 : i*itemWidth );

			if(i>currentIndex){
				pos_left+=expandWidth-itemWidth+options.borderWidth;
			}

			if(i==currentIndex+1){
				var deviator=options.deviator;
			}else {
				var deviator=0;
			}
			if(i==currentIndex){
				$item.addClass('active').stop(true).animate({
					"left": pos_left
				},options.animateTime,function(){
					$item.addClass("hide-mask")
				});
			}else{
				if(deviator==0){
					$item.stop(true).animate({
						"left": pos_left
					},options.animateTime);
				}else{
					if(beforeIndex>currentIndex){
						$item.stop(true).animate({
							"left": pos_left
						},options.animateTime);
					}else {
						$item.stop(true).animate({
							"left": parseInt($item.css("left"),10)-deviator
						},250,function(){
							$item.stop(true).animate({
								"left": pos_left
							},options.animateTime);
						});
					}
				}
			}
		});
	},
	isRestart:function($current,$active,$items){
		return $active.index()===$items.length-1 && $current.index()===0
	},
	initDom: function(options){
		var that=this,
				$items=$("#"+options.id).find(".pana-accordion-item");

		$items.each(function(i,elem){
			$item=$(elem);
			$item.css({"z-index":i+1,"width": options.expandWidth+"px"});
			$item.append('<div class="pana-accordion-mask"></div>');
		})
		that.active(options,$items.eq(options.extpand));
	}
}
