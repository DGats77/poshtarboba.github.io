(function(){
	/* dialog #writeme */

	var overlay = document.getElementById('overlay');
	var dialog = document.getElementById('writeme');

	function closeDialog(){
		overlay.style.display = 'none';
		dialog.style.display = 'none';
	}

	document.querySelectorAll('.writeme').forEach(function(button){
		button.addEventListener('click', function(){
			overlay.style.display = 'block';
			dialog.style.display = 'block';
		});
	});

	overlay.addEventListener('click', closeDialog);

	dialog.querySelector('.close').addEventListener('click', closeDialog);

	window.addEventListener('keydown', function(e){
		if (e.keyCode === 27) { closeDialog(); }
	});

})();



(function(){
	/* slideshow */

	if (window.innerWidth > 1000) {

		var titles = document.querySelectorAll('.slideshow .pager a');
		var slides = [];

		titles.forEach(function(title){
			slides.push(document.querySelector(title.getAttribute('href')));
			title.addEventListener('click', function(e){
				e.preventDefault();
				titles.forEach(function(title){ title.parentElement.classList.remove('active'); });
				this.parentElement.classList.add('active');
				slides.forEach(function(slide){ slide.style.display = 'none'; });
				document.querySelector(this.getAttribute('href')).style.display = 'block';
			});
		});

		titles[0].parentElement.classList.add('active');
		for (var i = 1; i < slides.length; i++) {
			slides[i].style.display = 'none';
		}

	}

})();



(function(){
	/* menu fix */

	if (window.innerWidth > 1000) {

		var header = document.querySelector('header');
		var nav = document.querySelector('header nav');
		var	menuTop = nav.offsetTop;
		var menuHeight = nav.offsetHeight;

		function scroll() {
			if (document.body.scrollTop >= menuTop) {
				nav.classList.add('fixed');
				header.style.paddingBottom = menuHeight + 'px';
			} else {
				nav.classList.remove('fixed');
				header.style.paddingBottom = '0';
			}
		}

		window.addEventListener('load', scroll);
		window.addEventListener('scroll', scroll);

	}

})();

(function(){
	/* menu finescroll */

	var items = document.querySelectorAll('header nav menu a');
	items.forEach(function(item){
		item.addEventListener('click', function(e){
			e.preventDefault();
			clearInterval(window.fineScrollIID);

			var box = document.querySelector('a[name="' + item.getAttribute('href').substr(1) + '"]');
			var top = 0;
			while (box.tagName.toLowerCase() !== 'body') {
				console.log(box, box.offsetTop);
				top += box.offsetTop;
				box = box.offsetParent;
			}
			var duration = 20;
			var delta = (top - document.body.scrollTop) / duration;
			console.log(top, document.body.scrollTop, duration);
			var step = 1;
			window.fineScrollIID = setInterval(function(){
				document.body.scrollTop += delta;
				step++;
				if (step > duration) {
					clearInterval(window.fineScrollIID);
					document.body.scrollTop = top;
				}
			}, 20);

		});
	});

})();
