/* нагадування про перевірку журналу */
reportCardNotification('19:30');

/* актуалізувати роки, місяці в лекціях */
actualDates();




(function($){
	/* TODO: переписати без jQuery */
	$('.js-toggle').on('click', function(){
		let $that = $(this);
		$('#'+$that.data('id')).stop(true, true).slideToggle(function(){
			$that.toggleClass('active');
		});
	});

})(jQuery);

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

function isAdmin() {
	return localStorage.getItem('admin');
}

function add0(n) {
	return n < 10 ? '0' + n : n.toString();
}

function reportCardNotification(time) {
	if (!isAdmin()) return;
	let today = new Date();
	today = today.getFullYear() + '-' + add0(today.getMonth() + 1) + '-' + add0(today.getDate());
	if (localStorage.getItem('reportCardNotificationDate') === today) return;
	let timerId;
	if (tryShowNotification()) return;
	timerId = setInterval(function() {
		tryShowNotification();
	}, 5 * 60 * 1000);
	
	function tryShowNotification() {
		let now = new Date();
		const [time_hrs, time_min] = time.split(':').map(function(e) { return parseInt(e); });
		const now_hrs = now.getHours();
		const now_min = now.getMinutes();
		if (now_hrs > time_hrs || now_hrs === time_hrs && now_min >= time_min) {
			if (timerId) clearInterval(timerId);
			localStorage.setItem('reportCardNotificationDate', today);
			alert('Заповни журнал.');
			return true;
		}
		return false;
	}
}

function actualDates(){
	let now = new Date();
	let year = now.getFullYear();
	let month = add0(now.getMonth() + 1);
	document.querySelectorAll('.js-year').forEach(function(span){ span.innerHTML = year; });
	document.querySelectorAll('.js-month').forEach(function(span){ span.innerHTML = month; });
}