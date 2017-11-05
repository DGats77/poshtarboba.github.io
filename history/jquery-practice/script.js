(function($){
	
	// expmenu
	
	$('.expmenu').each(function(){
		$(this).find('ul').hide();
		$(this).find('span').on('click', function(){
			$(this).nextAll('ul').slideToggle(200);
		});
		
		// якщо би у всіх li були б посилання, а не span
		/*$(this).find('a').on('click', function(){
			let $sub = $(this).parents('li').eq(0);
			if ($sub.has('ul')) {
				$sub.find('ul').eq(0).slideToggle(200);
				return false;
			} 
		});*/
		
	});
	
	// Akkordion
	
	$('.akkordion').each(function(){
		$(this).find('.akk-box').not(':first').hide();
		$(this).find('.akk-title').on('click', function(){
			if ($(this).next().is(':visible')) { return false; }
			$(this).parents('.akkordion').find('.akk-box').slideUp();
			$(this).next().slideDown();
		});
	});
	
	// Tabs
	
	$('.tabs').each(function(){
		$(this).find('a').not(':first').each(function(){
			$($(this).attr('href')).hide();
		}).end().on('click', function(){
			$(this).parents('.tabs').find('a').each(function(){
				$($(this).attr('href')).hide();
			});
			$($(this).attr('href')).show();
			history.pushState(null, null, $(this).attr('href'));
			return false;
		});
	});
	
	// scrollTop
	
	let $body = $(document.body);
	if ($body.hasClass('scrolltop')) {
		$body.append('<button class="to-top">to top</button>');
		let $button = $('.to-top');
		$button.hide().on('click', function(){
			$('html, body').animate({scrollTop: 0}, 500);
		});
		$(window).on('scroll', function(){
			$button['fade' + ($(window).scrollTop() > $(window).height() ? 'In' : 'Out')]();
		});
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})(jQuery);