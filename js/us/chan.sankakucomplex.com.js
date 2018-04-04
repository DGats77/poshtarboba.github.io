/* chan :before

window.eval = function(s) { console.log('eval(s), s.length = ', s.length); };
console.clear = function() { console.log('console.clear();'); };
document.write = function(s) { console.log('document.write(s), s.length = ', s.length); };
document.writeln = function(s) { console.log('document.writeln(s), s.length = ', s.length); };

*/

(function() {
	
	addUserCSS(); // добавити користувацькі стилі
	imageToTop(); // підняти головну картинку догори
	removeAllIframes(); // видаляти iframe
	
	function addUserCSS() {
		let style = createTag('style');
		let html = '#image { position:relative; width:auto !important; max-width:80vw !important;';
		html += 'height:98vh !important; transform: translateY(-278px); }\n#headerthumbs, #share,';
		html += '.scad-i, iframe { display:none !important; }';
		style.innerHTML = html;
		document.head.appendChild(style);
	}
	
	function imageToTop() {
		let image = $1('#image');
		if (!image) return;
		image.style.top = -image.offsetTop + 'px';
	}
	
	function removeAllIframes() {
		return; // немає потреби видаляти iframe, якщо грузиться chan :before
		// window.addEventListener('scroll', function() { removeIframes(); });
		removeIframes();
		setTimeout(removeIframes,1000);
		
		function removeIframes() {
			let iframes = $$('iframe');
			console.log('>>> iframes.length =', iframes.length);
			iframes.forEach(function(iframe) {
				iframe.remove();
				console.log('> iframe removed');
			});
		}
	}
	
})();







