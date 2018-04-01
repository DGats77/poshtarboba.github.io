window.addEventListener('load', function(){
	
	/* �����-������ ��� ������ */
	if (location.pathname === '/main/user.php' || location.pathname.substr(0, 5) === '/cat/') addTableCSS();
	
	/* ����������� �� ������ "���������� ��������" */
	let btnNext = document.querySelector('[value="���������� ��������"]');
	if (btnNext) { console.log('Button next'); btnNext.parentElement.submit(); }
	
	/* ��������� ������� ������ ����������� */
	imgLoadBigImage(document);
	
	/* �������� ������ �� ��� ���� ������� */
	linkToAllImages();
	
	/* ��������� ��� ����������� �� ����� �������� */
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
				a.innerText = '��� ���� �����������';
				let span = document.createElement('span');
				span.innerHTML = ' | <a href="' + href + '&showall=true">��� ���� �������</a>';
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
		console.log('Get next page');
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
	
});