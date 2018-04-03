window.GetURI = _GetURI;

(function(){
	
	if (location.host === 'imgsrc.ru') addScript('imgsrc.ru.js');
	
	function addScript(fileName){
		let script = document.createElement('script');
		document.documentElement.appendChild(script);
		script.setAttribute('src', 'https://poshtarboba.github.io/js/us/' + fileName);
		console.log('Added script', fileName);
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