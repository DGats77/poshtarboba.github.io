(function(){
	
	/* ховер-эффект для таблиц */
	if (location.pathname === '/main/user.php' || location.pathname.substr(0, 5) === '/cat/') addTableCSS();
	
	/* авторелоад списка категории */
	if (location.pathname.substr(0, 5) === '/cat/') catAutoReload();
	
	/* автопереход по кнопке "Продолжить просмотр" */
	let btnNext = document.querySelector('[value="Продолжить просмотр"]');
	if (btnNext) { console.log('Button next'); btnNext.parentElement.submit(); }
	
	/* загрузить большие версии изображений */
	imgLoadBigImage(document);
	
	/* добавить ссылку на все фото альбома */
	linkToAllImages();
	
	/* загрузить все изображения на одной странице */
	loadAllImages();
	
	function addTableCSS(){
		console.log('Add hover for table');
		let html = '.zebra tr:hover > td { background-color: #c5ccd0; }';
		let style = document.createElement('style');
		style.innerText = html;
		document.head.appendChild(style);
		document.querySelectorAll('table').forEach(function(table){
			table.classList.add('zebra');
		});
	}
	
	function catAutoReload(){
		console.log('autoreload');
		let a = document.querySelector('a[href="/main/search.php"]');
		let c = Math.floor(Math.random() * 241 + 60);
		let span = document.createElement('span');
		span.style.paddingRight = '16px';
		span.innerText = c;
		a.parentElement.insertBefore(span, a);
		let i = setInterval(function(){
			span.innerText = --c;
			if (c <= 0) {
				clearInterval(i);
				location.reload();
			}
		}, 1000);
	}
	
	function imgLoadBigImage(parent){
		let i = 0;
		parent.querySelectorAll('img[data-src]').forEach(function(img){
			img.setAttribute('src', img.dataset.src);
			img.classList.remove('lazyload');
			delete img.dataset.src;
			i++;
		});
		if (i) console.log('Loaded big images:', i);
	}
	
	function linkToAllImages(){
		document.querySelectorAll('a[href]').forEach(function(a){
			let href = a.getAttribute('href');
			if (href.substr(0, 14) === '/main/tape.php') {
				console.log('Add link to all images');
				a.innerText = 'все фото постранично';
				let span = document.createElement('span');
				span.innerHTML = ' | <a href="' + href + '&showall=true">все фото альбома</a>';
				a.parentElement.insertBefore(span, a.nextElementSibling);
			}
		});
	}
	
	function loadAllImages(){
		let search = location.search.substr(1).split('&');
		if (search.includes('showall=true')) {
			let href = [];
			document.querySelectorAll('a.navdot[href]').forEach(function(a){
				let url = a.getAttribute('href');
				href.forEach(function(item){ if (item === url) url = null; });
				if (url) href.push(url);
			});
			if (href.length) console.log('Load all images, found pages:', href.length + 1);
			getImagesPage(href);
		}
	}
	
	function getImagesPage(href){
		if (href.length === 0) return false;
		console.log('Get next page, total left:', href.length);
		GetURI(href.shift(), function(xhr){
			if (xhr.status === 200){
				let resp = xhr.response.match(/<body>([\s\S]*)<\/body>/gim);
				if (!resp[0]) return;
				let div = document.createElement('div');
				div.innerHTML = resp[0].replace(/<\/?body>/g, '');
				imgLoadBigImage(div);
				let html = '';
				div.querySelectorAll('img.big').forEach(function(img){ html += img.outerHTML + '<br>'; })
				div.innerHTML = html;
				document.body.appendChild(div);
			}
			getImagesPage(href);
		});
	}
	
})();
