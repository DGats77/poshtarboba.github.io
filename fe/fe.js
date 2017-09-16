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
		});
	});
}

toggleBox('.js-toggle');
*/