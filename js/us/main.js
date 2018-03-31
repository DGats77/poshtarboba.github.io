(function(){
	console.log('My userscripts start');
	
	if (location.host === 'imgsrc.ru') addScript('imgsrc.ru.js');
	
	function addScript(url){
		let script = document.createElement('script');
		document.documentElement.appendChild(script);
		script.setAttribute('src', 'https://poshtarboba.github.io/js/us/' + url);
	}
})();