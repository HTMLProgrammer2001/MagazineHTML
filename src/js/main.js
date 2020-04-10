import autosize from 'autosize';
import $ from 'jquery';

$('.dropdown__elem').on('click', function(){
	let dropdown = this.closest('.dropdown');

	if(!$(dropdown).hasClass('active')){
		$('.dropdown').removeClass('active');
		$(dropdown).addClass('active');
	}
	else {
		$(dropdown).removeClass('active');
	}
});

$('.burger').on('click', function(){
	$(this).toggleClass('active');

	$('.header__links').toggleClass('active');
});

$('#create').on('change', function(){
	if(this.checked) {
		$('#createForm').removeClass('hidden');
	}
	else {
		$('#createForm').addClass('hidden');
	}
});

$('[name="payment"]').on('click', function(){
	$('.payment__content').addClass('hidden');

	$(this).closest('.payment__type').find('.payment__content')
		.removeClass('hidden');
});

autosize(document.getElementById('message'));
