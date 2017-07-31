/* discover-box > search buttons */
(function(){
	var buttons = document.querySelectorAll('.search-index .btn-group span');
	buttons.forEach(function(button){
		button.addEventListener('click', function(){
			buttons.forEach(function(button){ button.classList.remove('active'); });
			this.classList.add('active');
		});
	});
})();