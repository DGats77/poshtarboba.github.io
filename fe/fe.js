(function($){

	/* TODO: переписати без jQuery */

	$('.js-toggle').on('click', function(){
		var $that = $(this);
		$('#'+$that.data('id')).stop(true, true).slideToggle(function(){
			$that.toggleClass('active');
		});
	});

})(jQuery);


/*
function toggleBox(handles){
	handles = document.querySelectorAll(handles);
	handles.forEach(function(handle){
		handle.addEventListener('click', function(){
			let box = document.querySelector('#' + this.dataset.id);
			if (box.classList.contains('animating')) { return; }
			if (box.offsetHeight) {
				box.dataset.height = box.offsetHeight;
			}
			else {
				box.style.height = '';
				box.dataset.height = box.offsetHeight;
				box.style.height = '0';
			}
			box.dataset.iteration = 0;
			box.dataset.animtype = 'show';
			box.dataset.timerid = setInterval(function(box){
				let progress = box.dataset.iteration / 20;
				 if (box.dataset.animtype === 'close') { progress = 1 - progress; }
				 box.style.height = progress * box.dataset.height;
			}, 20, box);
		});
	});
}

toggleBox('.js-toggle');
*/