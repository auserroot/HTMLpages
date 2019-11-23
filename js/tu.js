function random(n){
	return Math.floor(Math.random()*n);
}
var drections = [];
var _width = 0;
var _height = 0;
var n = 0;
$(".hover").hover(function(){
	_width = $(this).width();
	_height = $(this).height();
	n = random(4);
	drections = [{
			"top": -_height + "px",
			"opacity" : 0
		},
		{
			"left": -_width + "px",
			"opacity" : 0
		},
		{
			"top": _height + "px",
			"opacity" : 0
		},
		{
			"left": _width + "px",
			"opacity" : 0
		}]
},function(){
	$(this).find("img").eq(1).animate(drections[n],1000,function(){
		$(this).css({
			"left" : "0px",
			"top" : "0px",
			"opacity" : 1
		});
		$(this).prependTo($(this).parent());
	});
});