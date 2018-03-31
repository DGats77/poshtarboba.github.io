(function(){
	
	/* ховер-эффект дл€ таблиц */
	if (location.pathname === '/main/user.php' || location.pathname.substr(0, 5) === '/cat/') addTableCSS();
	
	/* автопереход по кнопке "ѕродолжить просмотр" */
	let btnNext = document.querySelector('[value="ѕродолжить просмотр"]');
	if (btnNext) btnNext.parentElement.submit();
	
	/* загрузить большие версии изображений */
	imgLoadBigImage(document);
	
	/* добавить ссылку на все фото альбома */
	linkToAllImages();
	
	/* загрузить все изображени€ на одной странице */
	loadAllImages();
	
	function addTableCSS(){
		let html = '.zebra tr:hover > td { background-color: #c5ccd0; }';
		let style = document.createElement('style');
		style.innerText = html;
		document.head.appendChild(style);
		let ths = document.querySelectorAll('tr:first-child > th:nth-child(2)');
		ths.forEach(function(th){
			if (th.innerText === 'фото') th.parentElement.parentElement.parentElement.classList.add('zebra');
		});
	}
	
	function imgLoadBigImage(parent){
		parent.querySelectorAll('img[data-src]').forEach(function(img){
			img.setAttribute('src', img.dataset.src);
			img.classList.remove('lazyload');
			delete img.dataset.src;
		});
	}
	
	function linkToAllImages(){
		document.querySelectorAll('a[href]').forEach(function(a){
			if (a.innerText === 'все фото на одной странице') {
				a.innerText = 'все фото постранично';
				let url = a.getAttribute('href') + '&showall=true';
				let span = document.createElement('span');
				span.innerHTML = ' | <a href="' + url + '">все фото альбома</a>';
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
			getImagesPage(href);
		}
	}
	
	function getImagesPage(href){
		if (href.length === 0) return false;
		let xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(){
			if (xhr.readyState !== 4) return;
			if (xhr.status !== 200) return;
			let resp = xhr.response.match(/<body>([\s\S]*)<\/body>/gim);
			if (!resp[0]) return;
			let div = document.createElement('div');
			div.innerHTML = resp[0].replace(/<\/?body>/g, '');
			imgLoadBigImage(div);
			let html = '';
			div.querySelectorAll('img.big').forEach(function(img){ html += img.outerHTML + '<br>'; })
			div.innerHTML = html;
			document.body.appendChild(div);
			getImagesPage(href);
		};
		xhr.open('GET', href.shift(), true);
		xhr.send();
	}
	
})();