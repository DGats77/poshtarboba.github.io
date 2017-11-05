(function($){
	
	window.catPos = { x: 0, y: 0 };
	
	$(window).on('mousemove', function(e){
		let bp = -e.clientX / 20 + 'px ' + -e.clientY / 20 + 'px';
		$('.motivator').css('background-position', bp);
		// cat
		window.catPos = { x: e.clientX, y: e.clientY };
	});

	setInterval(function(){
		$('.cat').css({
			left: window.catPos.x,
			top: window.catPos.y
		});
	}, 200);

})(jQuery);