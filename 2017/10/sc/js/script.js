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
					let top = getAnchorOffsetTop($(this));
					if (top <= scroll) { $active = $(this); }
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
	}).on('resize', function () {
		$(window).trigger('scroll');
	}).trigger('resize');

	/* timer */
	let $timer = $('.js-timer');
	$timer.append('<span class="d">0</span> <span class="h">0</span> <span class="m">0</span> <span class="s">0</span>');
	let $timerD = $timer.children('.d');
	let $timerH = $timer.children('.h');
	let $timerM = $timer.children('.m');
	let $timerS = $timer.children('.s');
	let finish = window.endOfTimer;
	finish = new Date(finish.year, finish.month - 1, finish.day, finish.hrs, finish.min, finish.sec);
	function setTimer(){
		let delta = Math.round((finish.valueOf() - Date.now()) / 1000);
		if (delta < 0) {
			$timer.children().text('0');
			clearInterval(window.endOfTimerID);
		} else {
			$timerD.text(Math.floor(delta / 24 / 3600));
			$timerH.text(Math.floor(delta % (24 * 3600) / 3600));
			$timerM.text(Math.floor(delta % 3600 / 60));
			$timerS.text(delta % 60);
		}
	}
	setTimer();
	window.endOfTimerID = setInterval(setTimer, 200);

	/* slideshow */

	$.fn.mySlideshow = mySlideshowPlugin;
	$('.slideshow, .peoples').mySlideshow();

})(jQuery);

/* slidesho plugin */
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
