(function($){

	/* TODO: переписати без jQuery */

	$('.js-toggle').on('click', function(){
		let $that = $(this);
		$('#'+$that.data('id')).stop(true, true).slideToggle(function(){
			$that.toggleClass('active');
		});
	});

})(jQuery);

/* поміняти дати у лекції на поточні */
(function(){
	let spans = document.querySelectorAll('.js-month');
	if (spans.length) {
		let d = new Date(), m = d.getMonth() + 1;
		spans.forEach(function(span){ span.innerHTML = d.getFullYear() + '-' + (m < 10 ? '0' + m : m); });
	}
})();

/* debug */

// (function(){
// 	function bodyAddClass(c){ document.body.classList.add(c); }
// 	function bodyAddMsg(s){ document.body.innerHTML = s + document.body.innerHTML; }
// 	/* крапка в кінці заголовків */
// 	let ttl = ['title', 'h1', 'h2', 'h3', 'h4'];
// 	ttl.forEach(function(tag){
// 		let n = 0;
// 		document.querySelectorAll(tag).forEach(function(e){
// 			let t = e.innerText;
// 			if (t[t.length - 1] === '.') { n++; }
// 		});
// 		if (n) {
// 			bodyAddClass('err');
// 			bodyAddMsg('<p>Dot in ' + tag + '.</p>');
// 		}
// 	});
// 	/* відсутність h1 чи їх надмірна кількість */
// 	let h1 = document.querySelectorAll('h1');
// 	if (h1.length !== 1) {
// 		bodyAddClass('err');
// 		bodyAddMsg('<p>H1 count: ' + h1.length + '</p>');
// 	}
// 	/* кількість скриптів */
// 	let scr = document.querySelectorAll('script');
// 	bodyAddMsg('<p>Scripts: ' + scr.length + '</p>');
// 	/* відсутність meta viewport */
// 	let meta = document.querySelectorAll('meta');
// 	let metavp = 0;
// 	meta.forEach(function(m){ if (m.name === 'viewport') { metavp++; } });
// 	if (metavp === 0) {
// 		bodyAddClass('err');
// 		bodyAddMsg('<p>Meta viewport is absent.</p>');
// 	}
// 	/* наявність додаткових стилів */
// 	let st = document.querySelectorAll('style');
// 	if (st.length) {
// 		bodyAddMsg('<p>Tag &lt;style&gt; present here.</p>');
// 	}
// 	/* якщо немає помилок - то все ок */
// 	if (!document.body.classList.contains('err')) {
// 		bodyAddClass('ok');
// 	}
// })();



/*
function toggleBox(handles){
	handles = document.querySelectorAll(handles);
	handles.forEach(function(handle){
		handle.addEventListener('click', function(){
			let box = document.querySelector('#' + this.dataset.id);
			if (box.classList.contains('animating')) { return; }
			if (box.offsetHeight) {
				box.dataset.height = box.offsetHeight;
			}
			else {
				box.style.height = '';
				box.dataset.height = box.offsetHeight;
				box.style.height = '0';
			}
			box.dataset.iteration = 0;
			box.dataset.animtype = 'show';
			box.dataset.timerid = setInterval(function(box){
				let progress = box.dataset.iteration / 20;
				 if (box.dataset.animtype === 'close') { progress = 1 - progress; }
				 box.style.height = progress * box.dataset.height;
			}, 20, box);
		});
	});
}

toggleBox('.js-toggle');
*/