(function($){

	setHeaderBackground();
	window.addEventListener('scroll', setHeaderBackground);
	window.addEventListener('scroll', activeMenuItem);
	faqList();
	formSlideToggle();

	scrollToSections();
	onResize();
	window.addEventListener('resize', onResize);

	initHamburger();




	function onResize(){
		setAnchorPosition();
		setFooterPosition();
		setSubSectionLinksSize();
	}

	function setHeaderBackground(){
		let scrollTop = document.documentElement.scrollTop;
		let height = document.getElementById('top_section').offsetHeight;
		console.log(scrollTop, height);
		let header = document.querySelector('header');
		let opacity = scrollTop > height ? 0.8 : scrollTop / height * 0.8;
		header.style.background = 'rgba(0, 0, 0, ' + opacity.toString() + ')';
	}

	function activeMenuItem(){
		let scrolled = window.pageYOffset || document.documentElement.scrollTop;
		let $li = $('header menu li').removeClass('active');
		let i = 0;
		for (; i < $li.length; i++) {
			let $anchor = $('a[name="' + $li.eq(i).find('a').attr('href').substr(1) + '"]');
			if ($anchor.offset().top - 5 > scrolled) break;
		}
		$li.eq(i - 1).addClass('active');
	}

	function faqList(){
		$('.faq-list .title').on('click', function(){
			$(this).parents('li').toggleClass('active').find('.description').slideToggle();
		});
	}

	function formSlideToggle(){
		$('[data-type="form-toggle"]').on('click', function(e){
			e.preventDefault();
			$($(this).toggleClass('active').attr('href')).slideToggle();
		});
	}

	function scrollToSections(){
		$('menu a[href^="#"], .menu a[href^="#"]').on('click', function(e){
			e.preventDefault();
			let top = $('a[name="' + $(this).attr('href').substr(1) + '"]').offset().top;
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
	function setFooterPosition(){
		let $footer = $('footer');
		let height = $footer.outerHeight();
		$footer.css('margin-top', -height + 'px');
	}
	function setSubSectionLinksSize(){
		let maxHeight = 0;
		let $links = $('.product-services.menu a');
		$links.each(function(){
			if ($(this).outerHeight() > maxHeight) maxHeight = $(this).outerHeight();
		});
		$links.css('min-height', maxHeight + 'px');
	}

	function initHamburger(){
		$('header .hamburger').on('click', function(){
			let $menu = $('header menu');
			if ($menu.is(':visible')) $menu.css('display', '');
			else $menu.slideDown();
		});
	}

})(jQuery);
