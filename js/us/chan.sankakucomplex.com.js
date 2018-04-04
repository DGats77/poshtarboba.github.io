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
		let style = fxCreateTag('style');
		let html = '#image { position:relative; width:auto !important; height: auto !important; '
		html += 'max-width:80vw !important; max-height:98vh !important; transform: translateY(-158px); '
		html += 'outline: 1px solid ddd; }\n#recommended { position:relative; transform: translateY(-158px); }';
		html += '\n#headerthumbs, #share, .scad-i, iframe { display:none !important; }';
		style.innerHTML = html;
		document.head.appendChild(style);
	}
	
	function imageToTop() {
		let image = fx$1('#image');
		if (!image) return;
		let offset = -image.offsetTop + 'px';
		image.style.top = offset;
		let recommended = fx$1('#recommended');
		if (!recommended) return;
		recommended.style.top = offset;
	}
	
	function removeAllIframes() {
		return; // немає потреби видаляти iframe, якщо грузиться chan :before
		// window.addEventListener('scroll', function() { removeIframes(); });
		removeIframes();
		setTimeout(removeIframes,1000);
		
		function removeIframes() {
			let iframes = fx$$('iframe');
			console.log('>>> iframes.length =', iframes.length);
			iframes.forEach(function(iframe) {
				iframe.remove();
				console.log('> iframe removed');
			});
		}
	}
	
})();







