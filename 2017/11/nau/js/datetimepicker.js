/*
* function datePicker(selector);
* function timePicker(selector);
* */

function datePicker(selector){
	document.querySelectorAll(selector).forEach(function(input){
		input.addEventListener('focus', function(){

		});
	});


	function createPicker(){
		let picker = document.createElement('div');
		let html = '<p><span class="prevYear" title="Previous Year">&lt;&lt;</span>';
		html += '<span class="prevMonth" title="Previous Month">&lt;</span>';
		html += '<span class="yearMonth"></span>';
		html += '<span class="nextMonth" title="Next Month">&gt;</span>';
		html += '<span class="nextYear" title="Next Year">&gt;&gt;</span>';
		html += '</p><table></table>';
		picker.setAttribute('id', 'datepicker');
	}

}


