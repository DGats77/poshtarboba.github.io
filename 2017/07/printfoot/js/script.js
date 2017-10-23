/* close dialog */
(function(){
	window.addEventListener('keydown', function(e){ if (e.keyCode === 27) { closeDialogs(); } });
	document.getElementById('dialogoverlay').addEventListener('click', function(){ closeDialogs(); });
	document.querySelectorAll('.dialog .close').forEach(function(buttonClose){
		buttonClose.addEventListener('click', function(){ closeDialogs(); });
	});

	function closeDialogs(){
		document.getElementById('dialogoverlay').style.display = 'none';
		document.querySelectorAll('.dialog').forEach(function(dialog){
			dialog.style.display = 'none';
		});
	}

})();

/* open signin dialog */
(function(){
	document.querySelector('.signin-button').addEventListener('click', function(){
		document.getElementById('dialogoverlay').style.display = 'block';
		document.getElementById('signin').style.display = 'block';
	});
	document.querySelector('.join-button').addEventListener('click', function(){
		document.getElementById('dialogoverlay').style.display = 'block';
		document.getElementById('signin').style.display = 'block';
		document.getElementById('signintabtitle2').checked = 'true';
	});
})();


/* mobile menu slideToggle */
(function(){
	var hamburger = document.querySelector('#hamburger');
	hamburger.addEventListener('click', function(){
		var direction = this.classList.toggle('active') ? 'down' : 'up';
		var menu = document.querySelector('header nav');
		slideToggle(menu, direction, 200, 20);
	});


	function slideToggle(element, direction, duration, frameDuration){
		clearInterval(element.animationIntervalID);
		var endHeight;
		if (direction === 'down') {
			var currentHeight = element.style.height;
			element.style.height = 'auto';
			endHeight = element.clientHeight;
			element.style.height = currentHeight ? currentHeight : '0';
		} else {
			endHeight = 0;
		}
		var startHeight = element.clientHeight;
		var frame = 0;
		var frames = Math.round(duration / frameDuration);
		var deltaHeight = (endHeight - startHeight) / frames;
		element.animationIntervalID = setInterval(function(){
			element.style.height = element.clientHeight + deltaHeight + 'px';
			frame++;
			if (frame >= frames) {
				clearInterval(element.animationIntervalID);
				element.style.height = endHeight + 'px';
			}
		}, frameDuration);
	}

})();

/* button ToTop */
(function(){
	var button = document.querySelector('.totop');
	button.addEventListener('click', function(e){
		e.preventDefault();
		var button = this;
		clearInterval(button.animationIntervalID);
		var duration = 800;
		var frameDuration = 20;
		var delta = document.body.scrollTop / duration * frameDuration;
		button.animationIntervalID = setInterval(function(){
			document.body.scrollTop -= delta;
			if (document.body.scrollTop <= 0) {
				clearInterval(button.animationIntervalID);
			}
		}, frameDuration);

	});
})();

/* discover-box > search buttons */
(function(){
	var buttons = document.querySelectorAll('.search-index .btn-group span');
	buttons.forEach(function(button){
		button.addEventListener('click', function(){
			buttons.forEach(function(button){ button.classList.remove('active'); });
			this.classList.add('active');
		});
	});
})();

/* additional slidetoggle */
(function(){
	var infos = document.querySelectorAll('.slideshow .info');
	infos.forEach(function(info){
		info.addEventListener('mouseenter', function(){	if (window.innerWidth >= 1200) { slideToggle(this, 'show', 200, 20); }});
		info.addEventListener('mouseleave', function(){	if (window.innerWidth >= 1200) { slideToggle(this, 'hide', 200, 20);}	});
	});

	function slideToggle(info, type, duration, frameDuration) {
		var addit = info.querySelector('.additional');
		if (info.classList.contains('animation')) {
			clearInterval(info.animationIntervalID);
			info.classList.remove('animation');
		} else {
			addit.style.height = 'auto';
		}
		info.classList.add('animation');
		var height = addit.clientHeight;
		var delta = height / duration * frameDuration;
		if (type === 'show') { addit.style.height = '0'; } else { delta *= -1; }
		info.animationIntervalID = setInterval(function(){
			addit.style.height = addit.clientHeight + delta + 'px';
			if (type === 'show' && addit.clientHeight >= height || type === 'hide' && addit.clientHeight === 0) {
				clearInterval(info.animationIntervalID);
				info.classList.remove('animation');
				addit.style.height = type === 'show' ? 'auto' : '0';
			}
		}, frameDuration);
	}

})();


/* slider */
(function(){
	document.querySelectorAll('.slideshow').forEach(function(slideshow){
		var wrap = slideshow.parentElement;
		var slides = slideshow.children;
		if (slides.length < 4) { return; }
		var prev = document.createElement('button');
		var next = document.createElement('button');
		var pager = document.createElement('p');
		prev.innerHTML = '<i class="ion-chevron-left"></i>';
		next.innerHTML = '<i class="ion-chevron-right"></i>';
		prev.className = 'prev';
		next.className = 'next';
		pager.className = 'pager';
		for (var i = 0; i < slideshow.children.length; i++) {
			pager.innerHTML += '<span>' + (i + 1) + '</span>';
		}
		var pages = pager.querySelectorAll('span');
		pages[0].classList.add('active');
		slides[0].classList.add('active');
		wrap.appendChild(prev);
		wrap.appendChild(next);
		wrap.appendChild(pager);
		next.onclick = function(){ moveSlide('next'); };
		prev.onclick = function(){ moveSlide('prev'); };
		reInit();
		window.addEventListener('resize', function(){ reInit(); });

		function getActiveNum(){
			for (var i = 0; i < slides.length; i++){
				if (slides[i].classList.contains('active')) { return i; }
			}
		}

		function reInit(){
			slideshow.removeAttribute('style');
			for (var i = 0; i < slides.length; i++){
				slides[i].removeAttribute('style');
			}
			slideshow.style.height = slides[0].clientHeight + 'px';
			for (i = 0; i < slides.length; i++){
				slides[i].style.width = slides[i].clientWidth + 'px';
				slides[i].style.height = slides[i].clientHeight + 'px';
				slides[i].style.marginLeft = '0';
				slides[i].style.marginRight = '0';
				slides[i].style.position = 'absolute';
				slides[i].style.top = '0';
			}
			setVisiblePositions();
		}

		function setVisiblePositions(){
			for (var i = 0; i < slides.length; i++){
				slides[i].style.display = 'none';
			}
			var  activeNum = getActiveNum();
			slides[activeNum].style.display = '';
			slides[activeNum].style.left = '0';
			if (window.innerWidth >= 1200) {
				var slideWidth = slides[activeNum].clientWidth;
				var nextNum1 = (activeNum + 1) % slides.length;
				var nextNum2 = (activeNum + 2) % slides.length;
				slides[nextNum1].style.display = '';
				slides[nextNum2].style.display = '';
				slides[nextNum1].style.left = slideWidth + 'px';
				slides[nextNum2].style.left = slideWidth * 2 + 'px';
			}
			pages.forEach(function(page){ page.classList.remove('active'); });
			pages[activeNum].classList.add('active');
		}

		var duration = 200;
		var frameDuration = 20;
		var frames = Math.round(duration / frameDuration);

		function moveSlide(direction){
			clearInterval(slideshow.animationIntervalID);
			//setVisiblePositions();
			var activeNum = getActiveNum();
			var slideWidth = slides[activeNum].clientWidth;
			var k = window.innerWidth >= 1200 ? 3 : 1;
			var nextNum = (direction === 'next' ? activeNum + k : activeNum - 1 + slides.length) % slides.length;
			slides[nextNum].style.left = (direction === 'next' ? slideWidth * k : -slideWidth) + 'px';
			slides[nextNum].style.display = 'block';
			slides[activeNum].classList.remove('active');
			slides[(direction === 'next' ? activeNum + 1 : activeNum - 1 + slides.length) % slides.length].classList.add('active');
			var delta = slideWidth / frames;
			if (direction === 'next') { delta *= -1; }
			var frame = 0;
			slideshow.style.overflow = 'hidden';
			slideshow.animationIntervalID = setInterval(function(){
				for (var i = 0; i < slides.length; i++){
					slides[i].style.left = parseInt(slides[i].style.left) + delta + 'px';
				}
				frame++;
				if (frame >= frames) {
					clearInterval(slideshow.animationIntervalID);
					setVisiblePositions();
					slideshow.style.overflow = '';
				}
			}, frameDuration);
		}

		/* swipe for mobile */
		document.addEventListener('touchstart', handleTouchStart, false);
		document.addEventListener('touchmove', handleTouchMove, false);
		var xSwipe = null;
		var ySwipe = null;
		function handleTouchStart(e) {
			xSwipe = e.touches[0].clientX;
			ySwipe = e.touches[0].clientY;
		}
		function handleTouchMove(e) {
			if (!xSwipe || !ySwipe) { return; }
			var xUp = e.touches[0].clientX;
			var yUp = e.touches[0].clientY;
			var xDiff = xSwipe - xUp;
			var yDiff = ySwipe - yUp;
			if ( Math.abs(xDiff) > Math.abs(yDiff)) {
				/*most significant*/
				if (xDiff > 0) { /* left swipe */ moveSlide('next'); } else { /* right swipe */ moveSlide('prev'); }
			} else {
				if (yDiff > 0) { /* up swipe */ } else { /* down swipe */	}
			}
			xSwipe = null;
			ySwipe = null;
		}

	});

})();