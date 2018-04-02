window.GetURI = _GetURI;

(function(){
	
	console.log('My UserScripts start');
	
	if (location.host === 'imgsrc.ru') addScript('imgsrc.ru.js');
	
	function addScript(url){
		let script = document.createElement('script');
		document.documentElement.appendChild(script);
		script.setAttribute('src', 'https://poshtarboba.github.io/js/us/' + url);
	}
	
})();

function _GetURI(uri, handle){
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if (xhr.readyState !== 4) return;
		handle(xhr);
	};
	xhr.open('GET', uri, true);
	xhr.send();
};