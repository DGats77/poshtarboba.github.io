(function($){

	/* TODO: переписати без jQuery */

	$('.js-toggle').on('click', function(){
		var $that = $(this);
		$('#'+$that.data('id')).stop(true, true).slideToggle(function(){
			$that.toggleClass('active');
		});
	});

})(jQuery);