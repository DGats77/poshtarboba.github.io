(function($){

	setHeaderBackground();
	window.addEventListener('scroll', setHeaderBackground);
	window.addEventListener('scroll', activeMenuItem);
	faqList();

	scrollToSections();
	setAnchorPosition();
	window.addEventListener('resize', setAnchorPosition);

	initHamburger();





	function setHeaderBackground(){
		let scrollTop = document.documentElement.scrollTop;
		let height = document.getElementById('top_section').offsetHeight;
		let header = document.querySelector('header');
		let opacity = scrollTop > height ? 0.8 : scrollTop / height * 0.8;
		header.style.background = `rgba(0, 0, 0, ${opacity})`;
	}

	function activeMenuItem(){
		let scrolled = window.pageYOffset || document.documentElement.scrollTop;
		let $li = $('header menu li').removeClass('active');
		let i = 0;
		for (; i < $li.length; i++) {
			let $anchor = $(`a[name="${$li.eq(i).find('a').attr('href').substr(1)}"]`);
			if ($anchor.offset().top - 5 > scrolled) break;
		}
		$li.eq(i - 1).addClass('active');
	}

	function faqList(){
		$('.faq-list .title').on('click', function(){
			$(this).parents('li').toggleClass('active').find('.description').slideToggle();
		});
	}

	function scrollToSections(){
		$('a[href^="#"]').on('click', function(e){
			e.preventDefault();
			let href = $(this).attr('href').substr(1);
			let top = $(`a[name="${href}"]`).offset().top;
			/*let scrolled = window.pageYOffset || document.documentElement.scrollTop;
			let delta = Math.abs(top - scrolled);
			$('html, body').stop().animate({ scrollTop: top }, Math.round(delta / 4), 'swing');*/
			$('html, body').stop().animate({ scrollTop: top }, 800, 'swing');
		});
	}
	function setAnchorPosition(){
		let height = $('header').outerHeight();
		$('a[name]').css('top', -height + 'px');
	}

	function initHamburger(){
		$('header .hamburger').on('click', function(){
			let $menu = $('header menu');
			if ($menu.is(':visible')) $menu.css('display', '');
			else $menu.slideDown();
		});
	}

})(jQuery);
