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

autosize(document.getElementById('message'));
