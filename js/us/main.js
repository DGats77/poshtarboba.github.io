/* main script:

// @require      https://poshtarboba.github.io/js/us/main.js?2

*/

let GetURI = _fx_GetURI;
let add0 = _fx_add0;
let $$ = _fx_$$;
let $1 = _fx_$1;
let createTag = _fx_createTag;
let addClass = _fx_addClass;
let removeClass = _fx_removeClass;
let toggleClass = _fx_toggleClass;

(function(){
	
	if (location.host === 'imgsrc.ru') addScript('imgsrc.ru.js');
	if (location.host === 'chan.sankakucomplex.com') addScript('chan.sankakucomplex.com.js');
	
	function addScript(fileName){
		let script = createTag('script');
		document.documentElement.appendChild(script);
		script.setAttribute('src', 'https://poshtarboba.github.io/js/us/' + fileName);
		console.log('Added script', fileName);
	}
	
})();

function _fx_GetURI(uri, handle){
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if (xhr.readyState !== 4) return;
		handle(xhr);
	};
	xhr.open('GET', uri, true);
	xhr.send();
};

function _fx_add0(n) { return n < 10 ? '0' + n : n.toString(); }
function _fx_$$(selector, parent) { if (!parent) parent = document; return parent.querySelectorAll(selector); }
function _fx_$1(selector, parent) { if (!parent) parent = document; return parent.querySelector(selector); }
function _fx_createTag(tag) { return document.createElement(tag); }
function _fx_addClass(elements, classes) { if (!elements) return; classes = classes.split(/\s+/); elements.forEach(function(elem) { className.forEach(function(className) { elem.classList.add(className); }) }); }
function _fx_removeClass(elements, classes) { if (!elements) return; classes = classes.split(/\s+/); elements.forEach(function(elem) { className.forEach(function(className) { elem.classList.remove(className); }) }); }
function _fx_toggleClass(elements, classes) { if (!elements) return; classes = classes.split(/\s+/); elements.forEach(function(elem) { className.forEach(function(className) { elem.classList.toggle(className); }) }); }
