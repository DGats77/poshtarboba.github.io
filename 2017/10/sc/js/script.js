(function($){

	function getAnchorOffsetTop($a){
		return $('a[name="' + $a.attr('href').substr(1) + '"]').offset().top;
	}

	function removeDisplayNone(){
		if (!$(this).is(':visible')) { $(this).css('display', ''); }
	}

	/* video size */
	let $video = $('#video').find('iframe');
	$video.attr('data-ratio', $video.width() / $video.height()).css({ 'max-width': $video.width(), width: '100%' });
	$(window).on('resize', function(){
		$video.height(Math.round($video.width() / parseFloat($video.attr('data-ratio'))));
	});

	/* hamburger button */
	$('.hamburger').on('click', function(){
		$('header nav > ul').slideToggle(removeDisplayNone);
	});

	/* language button */
	$('header nav .localize > a').on('click', function(e){
		e.preventDefault();
		$(this).next().slideToggle(removeDisplayNone);
	});

	/* navigation: scroll to section */
	$('nav .sections a').on('click', function (e) {
		e.preventDefault();
		let top = getAnchorOffsetTop($(this));
		let duration = Math.round(Math.abs($(window).scrollTop() - top) / 5);
		$('html, body').stop().animate({ scrollTop: top }, duration, 'swing');
		let $hamburger = $('.hamburger');
		if ($hamburger.is(':visible')) { $hamburger.trigger('click'); }
	});

	/* navigation: line under nav-menu */
	$('body').append('<span id="nav_line"></span>');
	$(window).on('scroll', function () {
		let $line = $('#nav_line');
		if ($line.is(':visible')) {
			let $a = $('nav .sections a');
			let scroll = $(window).scrollTop();
			let $active = $a.first();
			if ($('body').outerHeight() - $(window).height() - 100 < scroll) {
				$active = $a.last();
			} else {
				$a.each(function(){
					if (getAnchorOffsetTop($(this)) <= scroll) { $active = $(this); }
				});
			}
			$a.parent().removeClass('active');
			$active.parent().addClass('active');
			$line.css({
				width: $active.outerWidth() + 'px',
				left: $active.offset().left + 'px',
				top: $active.offset().top + $active.outerHeight() - scroll - 2 + 'px'
			});
		}
	});

	/* timer */
	let $timer = $('.js-timer');
	$timer.append('<span class="d">0</span> <span class="h">0</span> <span class="m">0</span> <span class="s">0</span>');
	let finish = new Date(window.endOfTimer);
	function setTimer(){
		let delta = Math.round((finish.valueOf() - Date.now()) / 1000);
		if (delta < 0) {
			$timer.children().text('0');
			clearInterval(window.endOfTimerID);
		} else {
			$timer.children('.d').text(Math.floor(delta / 24 / 3600));
			$timer.children('.h').text(Math.floor(delta % (24 * 3600) / 3600));
			$timer.children('.m').text(Math.floor(delta % 3600 / 60));
			$timer.children('.s').text(delta % 60);
		}
	}
	setTimer();
	window.endOfTimerID = setInterval(setTimer, 200);

	/* slideshow */
	$.fn.mySlideshow = mySlideshowPlugin;
	$('.slideshow, .peoples').mySlideshow();

	/* scroll-animation */
	$(window).on('scroll', function(){
		let $roadmap = $('#roadmap');
		let top = $(window).scrollTop();
		let wh = $(window).height();
		if (top > $roadmap.offset().top - wh / 2) {
			$roadmap.addClass('animate');
		}
		if ($(window).width() < 1200) {
			$roadmap.find('li').each(function(){
				if (top > $(this).offset().top - wh / 1.2) {
					$(this).addClass('animate');
				}
			});
		}
	});

	/* some size */
	$(window).on('resize', function(){
		let $store = $('#advantages').find('.store');
		$store.height($store.width());
	});

	/* triggers */
	$(window)
		.on('resize', function () { $(window).trigger('scroll'); })
		.trigger('resize');

})(jQuery);

/* slideshow plugin */
function mySlideshowPlugin(){
	let options = {
		interval: 5000
	};
	$(this).each(function(){
		let $slider = $(this);
		$slider.after('<span class="btn-prev"></span><span class="btn-next"></span><p class="pager"></p>');
		let $btnPrev = $slider.next();
		let $btnNext = $btnPrev.next();
		let $pager = $btnNext.next();
		$slider.children().each(function(){ $pager.append('<span></span>'); });
		setSlidesClass($slider, $slider.children(':first'));
		$slider
			.on('click', '.prev', function(){ goToSlide($slider, 'prev'); })
			.on('click', '.next', function(){ goToSlide($slider, 'next'); });
		$pager.children().on('click', function(){ goToSlide($slider, $(this).index()); });
		$btnPrev.on('click', function(){ goToSlide($slider, 'prev'); });
		$btnNext.on('click', function(){ goToSlide($slider, 'next'); });
		$slider.attr('data-timer', setTimeout(goToSlide, options.interval, $slider, 'next'));
		function getSlide($slider, type){
			let $next = $slider.children('.active')[type]();
			if (!$next.length) { $next = $slider.children(':' + (type === 'next' ? 'first' : 'last')); }
			return $next;
		}
		function setSlidesClass($slider, $active){
			$slider.children().removeClass('active next prev');
			$active.addClass('active');
			getSlide($slider, 'prev').addClass('prev');
			getSlide($slider, 'next').addClass('next');
			$slider.nextAll('.pager').children().removeClass('active').eq($active.index()).addClass('active');
		}
		function goToSlide($slider, slide){
			clearTimeout(parseInt($slider.attr('data-timer')));
			let $next = typeof slide === 'string' ? getSlide($slider, slide) : $slider.children().eq(slide);
			setSlidesClass($slider, $next);
			$slider.attr('data-timer', setTimeout(goToSlide, options.interval, $slider, 'next'));
		}
	});
}
